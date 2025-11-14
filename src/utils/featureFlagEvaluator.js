import FeatureFlag from "../models/featureFlagModel.js";
import crypto from "crypto";

/**
 * simple deterministic hash to a 0..99 bucket
 */
const hashToPercent = (seed) => {
  const h = crypto.createHash("sha256").update(seed).digest("hex");
  const int = parseInt(h.slice(0, 8), 16);
  return int % 100; // 0..99
};

/**
 * Evaluate a flag for given context.
 * context: { businessId, userId, attributes: { country, plan, ... } }
 */
export const evaluateFlag = async (key, context = {}) => {
  // 1) fetch flag (cache in prod)
  const flag = await FeatureFlag.findOne({ key, isActive: true });
  if (!flag) return { enabled: false, reason: "not_found" };

  // 2) global kill-switch / default
  if (!flag.enabled) return { enabled: false, reason: "globally_disabled" };

  // 3) evaluate rules in order
  const rules = flag.rules || [];
  for (const rule of rules) {
    if (rule.targetType === "global") {
      // if global rule present with percentage -> roll out to percentage
      if (rule.percentage === undefined) return { enabled: true, reason: "global_on" };
      const seed = `${key}::global`;
      const bucket = hashToPercent(seed);
      if (bucket < rule.percentage) return { enabled: true, reason: `global_pct_${rule.percentage}` };
      continue;
    }

    if (rule.targetType === "business" && context.businessId) {
      if (rule.targetId && rule.targetId === String(context.businessId)) return { enabled: true, reason: "business_target" };
      if (rule.percentage !== undefined) {
        const seed = `${key}::business::${context.businessId}`;
        if (hashToPercent(seed) < rule.percentage) return { enabled: true, reason: `business_pct_${rule.percentage}` };
      }
    }

    if (rule.targetType === "user" && context.userId) {
      if (rule.targetId && rule.targetId === String(context.userId)) return { enabled: true, reason: "user_target" };
      if (rule.percentage !== undefined) {
        const seed = `${key}::user::${context.userId}`;
        if (hashToPercent(seed) < rule.percentage) return { enabled: true, reason: `user_pct_${rule.percentage}` };
      }
    }

    if (rule.targetType === "segment") {
      // targetId in format "plan:pro" or "country:IN"
      const [k, v] = (rule.targetId || "").split(":");
      if (k && v && context.attributes && String(context.attributes[k]) === v) {
        if (rule.percentage === undefined) return { enabled: true, reason: "segment_match" };
        const seed = `${key}::segment::${k}::${v}::${context.userId || context.businessId || ""}`;
        if (hashToPercent(seed) < rule.percentage) return { enabled: true, reason: `segment_pct_${rule.percentage}` };
      }
    }
  }

  // fallback to defaultValue (truthy/false)
  return { enabled: Boolean(flag.defaultValue), reason: "default_value" };
};
