import mongoose from "mongoose";

const sentimentSummarySchema = new mongoose.Schema(
  {
    feedbackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
      required: false, // optional for business-level summaries
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: false,
    },
    type: {
      type: String,
      enum: ["Customer", "Business"],
      required: true, // Customer = personalized summary, Business = aggregate summary
    },
    period: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Overall"],
      default: "Overall",
    },
    summaryText: {
      type: String,
      required: [true, "Summary text is required"],
    },
    sentiment: {
      type: String,
      enum: ["Positive", "Neutral", "Negative"],
      required: true,
    },
    generatedBy: {
      type: String,
      enum: ["AI", "Manual"],
      default: "AI",
    },
  },
  { timestamps: true }
);

const SentimentSummary = mongoose.model("SentimentSummary", sentimentSummarySchema);
export default SentimentSummary;
