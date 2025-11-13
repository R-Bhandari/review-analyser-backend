// modules/billing/models/subscriptionModel.js

import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",          // or Company model depending on your structure
      required: true,
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "trialing", "past_due", "cancelled", "expired"],
      default: "active",
    },

    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    endDate: {
      type: Date,
      required: false,
    },

    renewalDate: {
      type: Date,
      required: false,
    },

    trialEndDate: {
      type: Date,
      required: false,
    },

    autoRenew: {
      type: Boolean,
      default: true,
    },

    cancelAtPeriodEnd: {
      type: Boolean,
      default: false,
    },

    cancelledAt: {
      type: Date,
      required: false,
    },

    paymentMethod: {
      type: String,
      required: false, // e.g., "razorpay", "stripe", "card_ending_4242"
    },

    notes: {
      type: String,
      required: false,
      trim: true,
    }
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
