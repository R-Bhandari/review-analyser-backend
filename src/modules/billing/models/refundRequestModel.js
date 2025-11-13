// modules/billing/models/refundRequestModel.js

import mongoose from "mongoose";

const refundRequestSchema = new mongoose.Schema(
  {
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentTransaction",
      required: [true, "Transaction ID is required"],
    },

    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },

    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },

    amountRequested: {
      type: Number,
      required: [true, "Refund amount is required"],
    },

    reason: {
      type: String,
      required: [true, "Refund reason is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "processed"],
      default: "pending",
    },

    adminNote: {
      type: String,
      required: false,
      trim: true,
    },

    refundGatewayId: {
      type: String, // Razorpay refund ID / Stripe refund ID
      required: false,
    },

    processedAt: {
      type: Date,
      required: false,
    }
  },
  { timestamps: true }
);

const RefundRequest = mongoose.model("RefundRequest", refundRequestSchema);
export default RefundRequest;
