import mongoose from "mongoose";

const analyticsCacheSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: false,
      index: true,
    },

    // Context for cached report
    cacheType: {
      type: String,
      enum: ["summary", "tags", "trend", "custom"],
      default: "summary",
    },
    periodType: {
      type: String,
      enum: ["daily", "weekly", "monthly", "custom"],
      default: "daily",
    },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },

    // Cached payload (entire analytics JSON)
    data: {
      type: mongoose.Schema.Types.Mixed, // flexible structure
      required: true,
    },

    // Metadata
    generatedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }, // optional TTL cache
    generatedBy: { type: String, default: "system" }, // system or user id
  },
  { timestamps: true }
);

// Optional TTL index for automatic expiry
analyticsCacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
analyticsCacheSchema.index({ business: 1, branch: 1, cacheType: 1, periodStart: 1 });

const AnalyticsCache = mongoose.model("AnalyticsCache", analyticsCacheSchema);
export default AnalyticsCache;
