import mongoose from "mongoose";

const autoSummarySchema = new mongoose.Schema(
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

    // Context of the summary
    summaryType: {
      type: String,
      enum: ["customer", "business", "category", "trend"],
      default: "business",
    },

    // Data references (link to what was summarized)
    sourceModel: { type: String, required: true }, // e.g., Feedback, TagAnalytics, TrendRecord
    sourceIds: [{ type: mongoose.Schema.Types.ObjectId }],

    // The actual AI-generated text
    summaryText: {
      type: String,
      required: true,
    },
    highlights: [{ type: String }], // optional bullet points

    // AI metadata
    aiProvider: { type: String, default: "openai" },
    modelName: { type: String, default: "gpt-4-turbo" },
    temperature: { type: Number, default: 0.7 },
    tokensUsed: { type: Number, default: 0 },
    generatedAt: { type: Date, default: Date.now },

    // Quality and status
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "success",
    },
    errorMessage: { type: String },

    // Link back to AIConfig
    aiConfigRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AIConfig",
    },
  },
  { timestamps: true }
);

autoSummarySchema.index({ business: 1, summaryType: 1, generatedAt: -1 });

const AutoSummary = mongoose.model("AutoSummary", autoSummarySchema);
export default AutoSummary;
