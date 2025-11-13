// modules/billing/models/paymentTransactionModel.js

import mongoose from "mongoose";

const paymentTransactionSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: [true, "Invoice ID is required"],
    },

    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },

    transactionId: {
      type: String,        // Razorpay Payment ID, Stripe Charge ID
      required: [true, "Payment transaction ID is required"],
    },

    paymentGateway: {
      type: String,
      enum: ["razorpay", "stripe", "paypal", "cash", "other"],
      required: [true, "Payment gateway is required"],
    },

    amount: {
      type: Number,
      required: [true, "Transaction amount is required"],
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["success", "failed", "pending", "refunded"],
      default: "pending",
    },

    paymentMethod: {
      type: String, // card, upi, netbanking, wallet, etc.
      required: false,
    },

    captured: {
      type: Boolean,
      default: false, // for stripe/razorpay capture flow
    },

    rawResponse: {
      type: Object, // store whole webhook/callback body
      required: false,
    },

    notes: {
      type: String,
      required: false,
      trim: true,
    }
  },
  { timestamps: true }
);

const PaymentTransaction = mongoose.model("PaymentTransaction", paymentTransactionSchema);
export default PaymentTransaction;
