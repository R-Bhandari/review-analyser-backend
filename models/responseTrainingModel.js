import mongoose from "mongoose";

const responseTrainingSchema = new mongoose.Schema(
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

    // Type of AI task
    taskType: {
      type: String,
      enum: ["summary", "insight", "tagging", "custom"],
      default: "summary",
    },

    // Reference to related AI request or summary
    aiRequestRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AIRequestLog",
      required: false,
    },
    autoSummaryRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AutoSummary",
      required: false,
    },

    // Data pair
    inputText: { type: String, required: true },
    aiGeneratedText: { type: String, required: true },
    humanCorrectedText: { type: String, required: false },

    // Feedback / evaluation
    rating: { type: Number, min: 1, max: 5 },
    feedbackNotes: { type: String },
    isApproved: { type: Boolean, default: false },
    needsRetraining: { type: Boolean, default: false },

    // AI model info
    aiProvider: { type: String, default: "openai" },
    modelName: { type: String, default: "gpt-4-turbo" },
    tokensUsed: { type: Number, default: 0 },

    // Metadata
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

responseTrainingSchema.index({ business: 1, taskType: 1 });

const ResponseTraining = mongoose.model("ResponseTraining", responseTrainingSchema);
export default ResponseTraining;
