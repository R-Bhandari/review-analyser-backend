import mongoose from "mongoose";

const passwordResetTokenSchema = new mongoose.Schema(
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
      // Store hashed token in production for best security
    },

    expiresAt: {
      type: Date,
      required: true
    },

    used: {
      type: Boolean,
      default: false
    },

    usedAt: {
      type: Date,
      default: null
    },

    ipAddress: {
      type: String,
      default: null
    },

    userAgent: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

passwordResetTokenSchema.index({ userId: 1 });
passwordResetTokenSchema.index({ token: 1 });
passwordResetTokenSchema.index({ expiresAt: 1 });

const PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  passwordResetTokenSchema
);
export default PasswordResetToken;
