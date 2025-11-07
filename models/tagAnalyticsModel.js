import mongoose from "mongoose";

const tagAnalyticsSchema = new mongoose.Schema(
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
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryTag",
      required: true,
      index: true,
    },

    // Aggregated feedback data
    totalFeedbacks: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    positiveCount: { type: Number, default: 0 },
    neutralCount: { type: Number, default: 0 },
    negativeCount: { type: Number, default: 0 },

    // Derived percentages
    positivePercentage: { type: Number, default: 0 },
    neutralPercentage: { type: Number, default: 0 },
    negativePercentage: { type: Number, default: 0 },

    lastComputedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

tagAnalyticsSchema.index({ business: 1, branch: 1, tag: 1 });

const TagAnalytics = mongoose.model("TagAnalytics", tagAnalyticsSchema);
export default TagAnalytics;
