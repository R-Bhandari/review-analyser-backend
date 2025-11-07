import mongoose from "mongoose";

const keywordClusterSchema = new mongoose.Schema(
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

    // Cluster Info
    clusterName: {
      type: String,
      required: [true, "Cluster name is required"],
      trim: true,
    },
    description: { type: String, trim: true },

    // Keywords & phrases inside this cluster
    keywords: [{ type: String, trim: true }],
    keyPhrases: [{ type: String, trim: true }],

    // Sentiment stats
    totalMentions: { type: Number, default: 0 },
    positiveCount: { type: Number, default: 0 },
    neutralCount: { type: Number, default: 0 },
    negativeCount: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },

    // Derived percentages
    positivePercentage: { type: Number, default: 0 },
    neutralPercentage: { type: Number, default: 0 },
    negativePercentage: { type: Number, default: 0 },

    // AI-related metadata
    generatedByAI: { type: Boolean, default: false },
    lastAnalyzedAt: { type: Date, default: Date.now },

    // Link to related tag if any
    relatedTag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryTag",
      required: false,
    },
  },
  { timestamps: true }
);

keywordClusterSchema.index({ business: 1, branch: 1, clusterName: 1 });

const KeywordCluster = mongoose.model("KeywordCluster", keywordClusterSchema);
export default KeywordCluster;
