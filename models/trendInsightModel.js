import mongoose from "mongoose";

const trendInsightSchema = new mongoose.Schema(
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

    // Context (daily, weekly, monthly)
    periodType: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "weekly",
    },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },

    // Insight content
    insightText: { type: String, required: true },
    category: { type: String }, // e.g., sentiment, volume, tag, performance
    confidenceScore: { type: Number, default: 0.9 },

    // Supporting data
    metrics: {
      previousValue: { type: Number, default: 0 },
      currentValue: { type: Number, default: 0 },
      changePercentage: { type: Number, default: 0 },
      direction: { type: String, enum: ["up", "down", "neutral"], default: "neutral" },
    },

    // AI metadata
    aiProvider: { type: String, default: "openai" },
    modelName: { type: String, default: "gpt-4-turbo" },
    aiConfigRef: { type: mongoose.Schema.Types.ObjectId, ref: "AIConfig" },
    generatedAt: { type: Date, default: Date.now },
    tokensUsed: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "success",
    },
    errorMessage: { type: String },
  },
  { timestamps: true }
);

trendInsightSchema.index({ business: 1, periodStart: 1, category: 1 });

const TrendInsight = mongoose.model("TrendInsight", trendInsightSchema);
export default TrendInsight;
