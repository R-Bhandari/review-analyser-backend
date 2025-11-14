// modules/rewards/models/rewardVoucherModel.js

import mongoose from "mongoose";

const rewardVoucherSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    coinsRequired: {
      type: Number,
      required: true
    },

    businessOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true
    },

    imageUrl: {
      type: String,
      required: false
    },

    validityStart: {
      type: Date,
      default: Date.now
    },

    validityEnd: {
      type: Date,
      required: true
    },

    stock: {
      type: Number,
      default: 999999
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const RewardVoucher = mongoose.model("RewardVoucher", rewardVoucherSchema);
export default RewardVoucher;
