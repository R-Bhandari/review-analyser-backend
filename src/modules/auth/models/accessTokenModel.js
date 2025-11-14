import mongoose from "mongoose";

const accessTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    token: {
      type: String,
      required: true,
      unique: true
      // NOTE: In production, store ONLY a HASH of the token (SHA-256)
    },

    deviceId: {
      type: String,
      default: null // Will match with Device model in K.6
    },

    ipAddress: {
      type: String,
      default: null
    },

    userAgent: {
      type: String,
      default: null
    },

    issuedAt: {
      type: Date,
      default: Date.now
    },

    expiresAt: {
      type: Date,
      required: true
      // e.g., Now + 15 minutes
    },

    isRevoked: {
      type: Boolean,
      default: false
    },

    revokedReason: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

accessTokenSchema.index({ userId: 1 });
accessTokenSchema.index({ token: 1 });
accessTokenSchema.index({ expiresAt: 1 });

const AccessToken = mongoose.model("AccessToken", accessTokenSchema);
export default AccessToken;
