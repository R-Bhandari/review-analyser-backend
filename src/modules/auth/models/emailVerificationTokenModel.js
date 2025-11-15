import mongoose from "mongoose";

const emailVerificationTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    email: {
      type: String,
      required: true
      // email the user is trying to verify
    },

    token: {
      type: String,
      required: true,
      unique: true
      // store hashed token in production for security
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

emailVerificationTokenSchema.index({ email: 1 });
emailVerificationTokenSchema.index({ token: 1 });
emailVerificationTokenSchema.index({ userId: 1 });

const EmailVerificationToken = mongoose.model(
  "EmailVerificationToken",
  emailVerificationTokenSchema
);
export default EmailVerificationToken;
