// modules/wallets/models/clientWalletModel.js

import mongoose from "mongoose";

const clientWalletSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      unique: true
    },

    balance: {
      type: Number,
      default: 0
    },

    currency: {
      type: String,
      default: "INR"
    },

    totalEarned: {
      type: Number,
      default: 0
    },

    totalRedeemed: {
      type: Number,
      default: 0
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

const ClientWallet = mongoose.model("ClientWallet", clientWalletSchema);
export default ClientWallet;
