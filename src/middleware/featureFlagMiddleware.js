import { evaluateFlag } from "../utils/featureFlagEvaluator.js";

/**
 * usage: app.get("/new-ui", requireFeature("new_feedback_ui"), (req,res)=>{})
 */
export const requireFeature = (flagKey) => {
  return async (req, res, next) => {
    try {
      // build context (example: business from auth middleware)
      const context = {
        businessId: req.user?.businessId,
        userId: req.user?._id,
        attributes: { plan: req.user?.plan, country: req.user?.country }
      };

      const result = await evaluateFlag(flagKey, context);
      if (result.enabled) return next();
      return res.status(403).json({ success: false, message: "Feature disabled", reason: result.reason });
    } catch (err) {
      console.error("Feature flag check failed:", err);
      // fail-safe: deny access if check fails
      return res.status(500).json({ success: false, message: "Feature check failed" });
    }
  };
};
