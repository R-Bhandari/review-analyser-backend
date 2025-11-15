import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
      // This will be null for attempts with non-existing emails
    },

    identifier: {
      type: String,
      required: true
      // email or phone attempted for login
    },

    success: {
      type: Boolean,
      default: false
    },

    reason: {
      type: String,
      default: null
      // e.g., "invalid_password", "invalid_otp", "user_not_found"
    },

    ipAddress: {
      type: String,
      default: null
    },

    userAgent: {
      type: String,
      default: null
    },

    deviceId: {
      type: String,
      default: null
    },

    location: {
      country: { type: String, default: null },
      city: { type: String, default: null },
      region: { type: String, default: null }
    }
  },
  {
    timestamps: true
  }
);

loginAttemptSchema.index({ identifier: 1 });
loginAttemptSchema.index({ userId: 1 });
loginAttemptSchema.index({ success: 1 });

const LoginAttempt = mongoose.model("LoginAttempt", loginAttemptSchema);
export default LoginAttempt;
