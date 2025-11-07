import mongoose from "mongoose";

const aiSummaryQueueSchema = new mongoose.Schema(
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

    // Task details
    taskType: {
      type: String,
      enum: ["summary", "insight", "tagging"],
      default: "summary",
    },
    sourceModel: { type: String, required: true }, // e.g. Feedback, TrendRecord
    sourceIds: [{ type: mongoose.Schema.Types.ObjectId }],

    // Status management
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "retry"],
      default: "pending",
    },
    retryCount: { type: Number, default: 0 },
    maxRetries: { type: Number, default: 3 },
    lastTriedAt: { type: Date },
    errorMessage: { type: String },

    // Output reference (links to AutoSummary or TrendInsight)
    outputRef: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "outputModel",
    },
    outputModel: {
      type: String,
      enum: ["AutoSummary", "TrendInsight"],
      required: false,
    },

    // AI Configuration
    aiConfigRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AIConfig",
    },

    // Metadata
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

aiSummaryQueueSchema.index({ business: 1, status: 1 });

const AISummaryQueue = mongoose.model("AISummaryQueue", aiSummaryQueueSchema);
export default AISummaryQueue;
