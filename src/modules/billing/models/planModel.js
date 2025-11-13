// modules/billing/models/planModel.js

import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: false,
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Plan price is required"],
    },

    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      required: [true, "Billing cycle is required"],
    },

    features: {
      type: [String], // e.g. ["Unlimited feedback", "AI Insights", "Multi-Branch Support"]
      default: [],
    },

    usageLimits: {
      feedbackScanLimit: { type: Number, default: 0 },
      aiCredits: { type: Number, default: 0 },
      userLimit: { type: Number, default: 0 },
      branchLimit: { type: Number, default: 1 }
    },

    trialDays: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", planSchema);
export default Plan;
