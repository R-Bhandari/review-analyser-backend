// modules/wallets/models/customerWalletModel.js

import mongoose from "mongoose";

const customerWalletSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      unique: true
    },

    balance: {
      type: Number,
      default: 0
    },

    totalEarned: {
      type: Number,
      default: 0
    },

    totalRedeemed: {
      type: Number,
      default: 0
    },

    expiryEnabled: {
      type: Boolean,
      default: true
    },

    lastUpdated: {
      type: Date,
      default: Date.now
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const CustomerWallet = mongoose.model("CustomerWallet", customerWalletSchema);
export default CustomerWallet;
