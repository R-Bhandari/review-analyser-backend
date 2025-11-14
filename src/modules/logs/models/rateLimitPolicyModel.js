// modules/system/models/rateLimitPolicyModel.js

import mongoose from "mongoose";

const rateLimitPolicySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    key: {
      type: String,
      required: true,
      unique: true,
      trim: true   // e.g. "feedback.submit", "referral.create", "api.global"
    },

    scope: {
      type: String,
      enum: ["global", "ip", "user", "business", "apiKey"],
      required: true
    },

    maxRequests: {
      type: Number,
      required: true,
      default: 100
    },

    windowSeconds: {
      type: Number,
      required: true,
      default: 60 // default 1 minute
    },

    strategy: {
      type: String,
      enum: ["fixed", "sliding", "token_bucket", "leaky_bucket"],
      default: "fixed"
    },

    // Penalty rules (optional)
    blockDurationSeconds: {
      type: Number,
      required: false
    },

    allowedBurst: {
      type: Number,
      required: false
    },

    description: {
      type: String,
      required: false
    },

    isActive: {
      type: Boolean,
      default: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

rateLimitPolicySchema.index({ key: 1 });

const RateLimitPolicy = mongoose.model(
  "RateLimitPolicy",
  rateLimitPolicySchema
);

export default RateLimitPolicy;
