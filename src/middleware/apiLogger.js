import APILog from "../modules/logs/models/apiLogModel.js";

/**
 * API Logger Middleware
 * Logs every incoming API request + response payload + metadata
 * Uses your existing APILog schema
 */
export const apiLogger = (req, res, next) => {
  const start = Date.now();

  // Save original send method
  const originalSend = res.send;

  let responseBody;

  // Override res.send to capture outgoing response
  res.send = function (body) {
    responseBody = body;
    return originalSend.apply(this, arguments);
  };

  // After response is finished
  res.on("finish", async () => {
    try {
      const latency = Date.now() - start;

      const logEntry = {
        direction: "incoming",
        endpoint: req.originalUrl,
        method: req.method,
        statusCode: res.statusCode,
        latencyMs: latency,
        requestPayload: req.body,
        responsePayload: tryParseJSON(responseBody),
        requestHeaders: req.headers,
        ipAddress: req.ip,
        integrationName: null,
        userId: req.user?._id || null,
        businessId: req.user?.businessId || null,
        isError: res.statusCode >= 400,
        errorMessage: res.statusCode >= 400 ? extractErrorMessage(responseBody) : null
      };

      // save but never block request
      APILog.create(logEntry).catch((e) =>
        console.error("⚠️ Failed to save APILog:", e.message)
      );
    } catch (err) {
      console.error("⚠️ APILog middleware error:", err);
    }
  });

  next();
};

// Utility: safely parse JSON from response body
function tryParseJSON(body) {
  try {
    if (typeof body === "string") return JSON.parse(body);
    return body;
  } catch {
    return body;
  }
}

// Utility: extract message from response
function extractErrorMessage(body) {
  try {
    const parsed = typeof body === "string" ? JSON.parse(body) : body;
    return parsed?.message || "Unknown error";
  } catch {
    return "Unknown error";
  }
}
