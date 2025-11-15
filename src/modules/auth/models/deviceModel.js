import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    deviceId: {
      type: String,
      required: true
      // A stable browser/device identifier (UUID or hashed fingerprint)
    },

    deviceType: {
      type: String,
      enum: ["web", "mobile", "tablet", "desktop", "unknown"],
      default: "web"
    },

    os: {
      type: String,
      default: null
    },

    browser: {
      type: String,
      default: null
    },

    ipAddress: {
      type: String,
      default: null
    },

    userAgent: {
      type: String,
      default: null
    },

    brand: {
      type: String,
      default: null
      // For mobile devices (Samsung, iPhone, etc.)
    },

    model: {
      type: String,
      default: null
      // Device model name if available
    },

    isTrusted: {
      type: Boolean,
      default: false
    },

    firstLoginAt: {
      type: Date,
      default: Date.now
    },

    lastSeenAt: {
      type: Date,
      default: Date.now
    },

    lastLocation: {
      country: { type: String, default: null },
      city: { type: String, default: null },
      region: { type: String, default: null }
    },

    disabled: {
      type: Boolean,
      default: false
    },

    disabledReason: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

deviceSchema.index({ userId: 1 });
deviceSchema.index({ deviceId: 1 });

const Device = mongoose.model("Device", deviceSchema);
export default Device;
