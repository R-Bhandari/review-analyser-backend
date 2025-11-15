import mongoose from "mongoose";

const consentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: false
    },

    consentType: {
      type: String,
      enum: ["terms", "privacy", "cookies", "marketing", "data_sharing", "other"],
      required: true
    },

    version: {
      type: String,
      required: true
      // e.g., "v1.2", "2025-09-01", etc.
    },

    accepted: {
      type: Boolean,
      default: true
    },

    acceptedAt: {
      type: Date,
      default: Date.now
    },

    withdrawn: {
      type: Boolean,
      default: false
    },

    withdrawnAt: {
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
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
      /*
        Optional extra info:
        { locale: "en-IN", deviceId: "DEVICE-123", note: "accepted on mobile" }
      */
    }
  },
  { timestamps: true }
);

consentSchema.index({ userId: 1 });
consentSchema.index({ consentType: 1, version: 1 });

const ConsentRecord = mongoose.model("ConsentRecord", consentSchema);
export default ConsentRecord;
