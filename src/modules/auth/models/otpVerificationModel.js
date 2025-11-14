import mongoose from "mongoose";

const otpVerificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    identifier: {
      type: String,
      required: true
      // email OR phone number (unified field)
    },

    otp: {
      type: String,
      required: true
      // Store hashed OTP in production for extra security
    },

    channel: {
      type: String,
      enum: ["email", "sms", "whatsapp"],
      default: "sms"
    },

    purpose: {
      type: String,
      enum: [
        "login",
        "signup",
        "change_phone",
        "change_email",
        "password_reset",
        "2fa",
        "sensitive_action"
      ],
      required: true
    },

    expiresAt: {
      type: Date,
      required: true
    },

    attempts: {
      type: Number,
      default: 0
    },

    maxAttempts: {
      type: Number,
      default: 5
    },

    verified: {
      type: Boolean,
      default: false
    },

    verifiedAt: {
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

otpVerificationSchema.index({ identifier: 1 });
otpVerificationSchema.index({ purpose: 1 });
otpVerificationSchema.index({ expiresAt: 1 });

const OTPVerification = mongoose.model("OTPVerification", otpVerificationSchema);
export default OTPVerification;
