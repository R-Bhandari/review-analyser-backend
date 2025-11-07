import mongoose from "mongoose";

const feedbackResponseSchema = new mongoose.Schema(
  {
    feedbackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
      required: false, // Linked after creating Feedback summary
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
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
    customerName: {
      type: String,
      required: false,
    },
    selectedOption: {
      text: { type: String, required: true },
      sentiment: {
        type: String,
        enum: ["Positive", "Neutral", "Negative"],
        required: true,
      },
      score: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const FeedbackResponse = mongoose.model("FeedbackResponse", feedbackResponseSchema);
export default FeedbackResponse;
