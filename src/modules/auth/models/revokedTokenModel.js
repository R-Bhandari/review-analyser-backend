import mongoose from "mongoose";

const revokedTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true
      // In production we store HASH of token, not the actual string
    },

    type: {
      type: String,
      enum: ["access", "refresh"],
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    reason: {
      type: String,
      default: null
      // e.g. "manual_logout", "token_rotation", "compromised", etc.
    },

    revokedByIp: {
      type: String,
      default: null
    },

    expiresAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

revokedTokenSchema.index({ token: 1 });
revokedTokenSchema.index({ userId: 1 });
revokedTokenSchema.index({ expiresAt: 1 });

const RevokedToken = mongoose.model("RevokedToken", revokedTokenSchema);
export default RevokedToken;
