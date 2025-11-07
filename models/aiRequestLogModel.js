import mongoose from "mongoose";

const aiRequestLogSchema = new mongoose.Schema(
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
    },

    // AI configuration reference
    aiConfigRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AIConfig",
    },

    // Request details
    requestType: {
      type: String,
      enum: ["summary", "insight", "tagging", "custom"],
      default: "summary",
    },
    promptText: { type: String, required: true },
    inputTokens: { type: Number, default: 0 },
    outputTokens: { type: Number, default: 0 },
    totalTokens: { type: Number, default: 0 },

    // Response data
    responseText: { type: String },
    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },
    errorMessage: { type: String },
    latencyMs: { type: Number, default: 0 },

    // Cost estimation (optional)
    estimatedCost: { type: Number, default: 0 },

    // Metadata
    aiProvider: { type: String, default: "openai" },
    modelName: { type: String, default: "gpt-4-turbo" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

aiRequestLogSchema.index({ business: 1, createdAt: -1 });

const AIRequestLog = mongoose.model("AIRequestLog", aiRequestLogSchema);
export default AIRequestLog;
