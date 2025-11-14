// modules/wallets/models/walletTransactionModel.js

import mongoose from "mongoose";

const walletTransactionSchema = new mongoose.Schema(
  {
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

    amount: {
      type: Number,
      required: true
    },

    transactionType: {
      type: String,
      required: true,
      enum: ["credit", "debit"]
    },

    reason: {
      type: String,
      required: true,
      enum: [
        "business_referral_reward",
        "customer_feedback_reward",
        "customer_business_referral",
        "invoice_discount_redeem",
        "voucher_redeem",
        "affiliate_commission",
        "admin_adjustment"
      ]
    },

    previousBalance: {
      type: Number,
      required: true
    },

    newBalance: {
      type: Number,
      required: true
    },

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    },

    referenceType: {
      type: String,
      enum: [
        "Referral",
        "ReferralEarning",
        "Invoice",
        "RewardVoucher",
        "Business",
        "Customer",
        "AffiliatePartner"
      ],
      required: false
    },

    metadata: {
      type: Object,
      required: false
    }
  },
  { timestamps: true }
);

const WalletTransaction = mongoose.model("WalletTransaction", walletTransactionSchema);
export default WalletTransaction;
