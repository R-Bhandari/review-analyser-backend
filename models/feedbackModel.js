import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
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
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    customerName: {
      type: String,
      required: false,
    },
    customerPhone: {
      type: String,
      required: false,
    },
    responses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FeedbackResponse",
      },
    ],
    averageScore: {
      type: Number,
      default: 0,
    },
    sentiment: {
      type: String,
      enum: ["Positive", "Neutral", "Negative"],
      default: "Neutral",
    },
    summaryForCustomer: {
      type: String,
    },
    summaryForBusiness: {
      type: String,
    },
    redirectUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ["New", "In Progress", "Resolved"],
      default: "New",
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
