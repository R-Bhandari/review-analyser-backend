// modules/system/middleware/rateLimiter.js

import RateLimitPolicy from "../models/rateLimitPolicyModel.js";

// TEMP IN-MEMORY STORE (Replace with Redis in production)
const rateLimitStore = new Map();

/*
 * Generate a unique key based on scope
 */
const resolveScopeKey = (policy, req) => {
  switch (policy.scope) {
    case "ip":
      return `ip:${req.ip}`;
    case "user":
      return req.user ? `user:${req.user._id}` : `user:guest`;
    case "business":
      return req.user?.businessId
        ? `business:${req.user.businessId}`
        : `business:unknown`;
    case "apiKey":
      return req.headers["x-api-key"]
        ? `apiKey:${req.headers["x-api-key"]}`
        : "apiKey:none";
    case "global":
    default:
      return "global:all";
  }
};

/*
 * Core Rate Limiter
 * Usage: rateLimiter("feedback.submit")
 */
export const rateLimiter = (policyKey) => {
  return async (req, res, next) => {
    try {
      // 1️⃣ Fetch policy from DB
      const policy = await RateLimitPolicy.findOne({ key: policyKey, isActive: true });

      if (!policy) return next(); // No policy = no limit

      // 2️⃣ Determine rate limit bucket
      const scopeIdentifier = resolveScopeKey(policy, req);
      const windowKey = `${policy.key}:${scopeIdentifier}`;

      const now = Date.now();
      const windowMs = policy.windowSeconds * 1000;

      // Get existing entry or create new
      let bucket = rateLimitStore.get(windowKey);

      if (!bucket) {
        bucket = { count: 0, windowStart: now };
        rateLimitStore.set(windowKey, bucket);
      }

      // 3️⃣ Reset window if expired
      if (now - bucket.windowStart >= windowMs) {
        bucket.count = 0;
        bucket.windowStart = now;
      }

      // 4️⃣ Increment attempt
      bucket.count += 1;

      // 5️⃣ Check limit
      if (bucket.count > policy.maxRequests) {
        // Optional blocking
        if (policy.blockDurationSeconds) {
          bucket.blockedUntil = now + policy.blockDurationSeconds * 1000;
        }

        return res.status(429).json({
          success: false,
          message: "Rate limit exceeded",
          reason: `${policyKey}`,
          scope: policy.scope,
          retryAfterSeconds: Math.ceil((bucket.windowStart + windowMs - now) / 1000),
        });
      }

      return next();
    } catch (error) {
      console.error("Rate limit error:", error);
      // Safety fallback: allow operation
      return next();
    }
  };
};
