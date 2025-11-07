import mongoose from "mongoose";

const aiConfigSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    // Provider setup
    provider: {
      type: String,
      enum: ["openai", "gemini", "anthropic", "custom"],
      default: "openai",
    },

    // Model details
    modelName: {
      type: String,
      default: "gpt-4-turbo", // Default model name, can be changed later
    },
    apiKey: {
      type: String,
      required: false, // will be set later securely
      select: false, // never returned in API responses
    },
    baseURL: {
      type: String,
      default: "https://api.openai.com/v1",
    },

    // Global parameters
    temperature: { type: Number, default: 0.7 },
    maxTokens: { type: Number, default: 500 },
    topP: { type: Number, default: 1 },
    frequencyPenalty: { type: Number, default: 0 },
    presencePenalty: { type: Number, default: 0 },

    // AI Feature Toggles
    enableSummaries: { type: Boolean, default: true },
    enableInsights: { type: Boolean, default: true },
    enableTagging: { type: Boolean, default: true },

    // Prompt Templates (Customizable)
    prompts: {
      summaryPrompt: { type: String, default: "Generate a short summary for the given feedback text." },
      insightPrompt: { type: String, default: "Analyze the trends in this data and highlight key insights." },
      tagPrompt: { type: String, default: "Identify relevant tags or categories for this feedback." },
    },

    // Security + audit
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    lastModifiedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

aiConfigSchema.index({ business: 1 });

const AIConfig = mongoose.model("AIConfig", aiConfigSchema);
export default AIConfig;
