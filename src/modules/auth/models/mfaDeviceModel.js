import mongoose from "mongoose";

const mfaDeviceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      enum: ["totp", "sms", "email", "backup_codes"],
      required: true
    },

    // For TOTP (Google Authenticator)
    secret: {
      type: String,
      default: null
      // Store encrypted in production
    },

    // Backup codes (hashed)
    backupCodes: {
      type: [String],
      default: []
    },

    phone: {
      type: String,
      default: null
    },

    email: {
      type: String,
      default: null
    },

    enabled: {
      type: Boolean,
      default: false
    },

    verified: {
      type: Boolean,
      default: false
    },

    verifiedAt: {
      type: Date,
      default: null
    },

    lastUsedAt: {
      type: Date,
      default: null
    },

    deviceName: {
      type: String,
      default: null
      // Example: "Pixel 7 - Google Authenticator"
    }
  },
  { timestamps: true }
);

mfaDeviceSchema.index({ userId: 1 });
mfaDeviceSchema.index({ type: 1 });

const MFADevice = mongoose.model("MFADevice", mfaDeviceSchema);
export default MFADevice;
