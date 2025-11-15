import mongoose from "mongoose";

const socialAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    provider: {
      type: String,
      enum: ["google", "facebook", "apple", "github", "linkedin", "microsoft"],
      required: true
    },

    providerUserId: {
      type: String,
      required: true,
      index: true
      // Google sub ID, Facebook ID, Apple user identifier, etc.
    },

    email: {
      type: String,
      default: null
    },

    accessToken: {
      type: String,
      default: null
      // In production: store encrypted, or do not store at all
    },

    refreshToken: {
      type: String,
      default: null
    },

    avatar: {
      type: String,
      default: null
    },

    profileData: {
      type: Object,
      default: {}
      // Store name, locale, metadata from provider
    },

    linkedAt: {
      type: Date,
      default: Date.now
    },

    lastLoginAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

socialAccountSchema.index({ userId: 1 });
socialAccountSchema.index({ provider: 1, providerUserId: 1 }, { unique: true });

const SocialAccount = mongoose.model("SocialAccount", socialAccountSchema);
export default SocialAccount;
