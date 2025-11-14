// modules/referrals/models/referralModel.js

import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
  {
    referrerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "referrerType"
    },

    referrerType: {
      type: String,
      required: true,
      enum: ["Business", "Customer", "AffiliatePartner"]
    },

    referredEntityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      refPath: "referredEntityType"
    },

    referredEntityType: {
      type: String,
      required: true,
      enum: ["Business", "Customer"]
    },

    referralCode: {
      type: String,
      required: true,
      unique: true
    },

    referralType: {
      type: String,
      enum: [
        "business_to_business",
        "customer_to_business",
        "customer_feedback_reward"
      ],
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed", "cancelled"],
      default: "pending"
    },

    pointsToAward: {
      type: Number,
      required: true
    },

    awarded: {
      type: Boolean,
      default: false
    },

    metadata: {
      type: Object,
      required: false
    }
  },
  { timestamps: true }
);

const Referral = mongoose.model("Referral", referralSchema);
export default Referral;
