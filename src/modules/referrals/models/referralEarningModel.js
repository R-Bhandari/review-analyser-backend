// modules/referrals/models/referralEarningModel.js

import mongoose from "mongoose";

const referralEarningSchema = new mongoose.Schema(
  {
    referralId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Referral",
      required: true
    },

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

    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "walletType"
    },

    walletType: {
      type: String,
      required: true,
      enum: ["ClientWallet", "CustomerWallet"]
    },

    points: {
      type: Number,
      required: true
    },

    earningType: {
      type: String,
      enum: [
        "business_referral_reward",
        "customer_feedback_reward",
        "customer_business_referral",
        "affiliate_referral_commission"
      ],
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "credited", "reverted"],
      default: "pending"
    },

    metadata: {
      type: Object,
      required: false
    }
  },
  { timestamps: true }
);

const ReferralEarning = mongoose.model("ReferralEarning", referralEarningSchema);
export default ReferralEarning;
