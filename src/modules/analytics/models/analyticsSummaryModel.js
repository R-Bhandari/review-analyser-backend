import mongoose from "mongoose";

const analyticsSummarySchema = new mongoose.Schema(
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

    // Period metadata
    periodType: {
      type: String,
      enum: ["daily", "weekly", "monthly", "overall"],
      default: "overall",
    },
    periodStart: Date,
    periodEnd: Date,

    // Feedback metrics
    totalFeedbacks: { type: Number, default: 0 },
    positiveCount: { type: Number, default: 0 },
    neutralCount: { type: Number, default: 0 },
    negativeCount: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },

    // Derived ratios
    positivePercentage: { type: Number, default: 0 },
    neutralPercentage: { type: Number, default: 0 },
    negativePercentage: { type: Number, default: 0 },

    // Source breakdown
    sourceBreakdown: {
      app: { type: Number, default: 0 },
      web: { type: Number, default: 0 },
      form: { type: Number, default: 0 },
    },

    lastComputedAt: { type: Date, default: Date.now },
    remarks: { type: String },
  },
  { timestamps: true }
);

analyticsSummarySchema.index({ business: 1, branch: 1, periodType: 1, periodStart: 1 });

const AnalyticsSummary = mongoose.model("AnalyticsSummary", analyticsSummarySchema);
export default AnalyticsSummary;
