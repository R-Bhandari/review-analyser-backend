// modules/billing/models/billingModel.js

import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: [true, "Subscription ID is required"],
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    billingPeriodStart: {
      type: Date,
      required: [true, "Billing period start date is required"],
    },

    billingPeriodEnd: {
      type: Date,
      required: [true, "Billing period end date is required"],
    },

    amount: {
      type: Number,
      required: [true, "Billing amount is required"],
    },

    discount: {
      type: Number,
      default: 0, // flat discount amount
    },

    tax: {
      type: Number,
      default: 0, // tax amount
    },

    totalPayable: {
      type: Number,
      required: [true, "Total payable amount is required"],
    },

    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: false,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled"],
      default: "pending",
    },

    notes: {
      type: String,
      required: false,
      trim: true,
    }
  },
  { timestamps: true }
);

const Billing = mongoose.model("Billing", billingSchema);
export default Billing;
