// modules/referrals/models/affiliatePartnerModel.js

import mongoose from "mongoose";

const affiliatePartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    referralCode: {
      type: String,
      required: true,
      unique: true
    },

    commissionRate: {
      type: Number,
      default: 10 // means 10% commission (can be changed per partner)
    },

    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientWallet", // Affiliate wallet can use same structure OR separate later
      required: false
    },

    totalEarnings: {
      type: Number,
      default: 0
    },

    active: {
      type: Boolean,
      default: true
    },

    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

const AffiliatePartner = mongoose.model("AffiliatePartner", affiliatePartnerSchema);
export default AffiliatePartner;
