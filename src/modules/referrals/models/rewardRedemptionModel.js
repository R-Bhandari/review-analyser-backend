// modules/rewards/models/rewardRedemptionModel.js

import mongoose from "mongoose";

const rewardRedemptionSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    voucherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RewardVoucher",
      required: true
    },

    businessOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true
    },

    walletTransactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WalletTransaction",
      required: true
    },

    coinsUsed: {
      type: Number,
      required: true
    },

    redemptionCode: {
      type: String,
      required: true,
      unique: true
    },

    qrCodeUrl: {
      type: String,
      required: false
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending"
    },

    redeemedAt: {
      type: Date,
      required: false
    },

    metadata: {
      type: Object,
      required: false
    }
  },
  { timestamps: true }
);

const RewardRedemption = mongoose.model("RewardRedemption", rewardRedemptionSchema);
export default RewardRedemption;
