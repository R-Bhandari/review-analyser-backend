// modules/billing/models/usageLimitModel.js

import mongoose from "mongoose";

const usageLimitSchema = new mongoose.Schema(
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

    usage: {
      feedbackScansUsed: { type: Number, default: 0 },
      aiCreditsUsed: { type: Number, default: 0 },
      usersUsed: { type: Number, default: 0 },
      branchesUsed: { type: Number, default: 0 },
      smsSent: { type: Number, default: 0 },
      emailsSent: { type: Number, default: 0 }
    },

    periodStart: {
      type: Date,
      required: true,
      default: Date.now,
    },

    periodEnd: {
      type: Date,
      required: true,
    },

    lastResetAt: {
      type: Date,
      required: false,
    },

    autoResetCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },

    notes: {
      type: String,
      required: false,
      trim: true,
    }
  },
  { timestamps: true }
);

const UsageLimit = mongoose.model("UsageLimit", usageLimitSchema);
export default UsageLimit;
