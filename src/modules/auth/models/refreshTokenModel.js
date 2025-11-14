import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    deviceId: {
      type: String,
      default: null
    },

    token: {
      type: String,
      required: true,
      unique: true
      // Should store HASH of token in real production
    },

    expiresAt: {
      type: Date,
      required: true
    },

    revoked: {
      type: Boolean,
      default: false
    },

    revokedAt: {
      type: Date,
      default: null
    },

    revokedByIp: {
      type: String,
      default: null
    },

    replacedByToken: {
      type: String,
      default: null
      // For token rotation
    },

    createdByIp: {
      type: String,
      default: null
    },

    lastUsedAt: {
      type: Date,
      default: null
    },

    userAgent: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

refreshTokenSchema.index({ userId: 1 });
refreshTokenSchema.index({ token: 1 });
refreshTokenSchema.index({ expiresAt: 1 });

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;
