import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true
    },

    key: {
      type: String,
      required: true,
      unique: true
    },

    label: {
      type: String,
      default: null
      // e.g., "CRM Integration", "Mobile App Key"
    },

    scopes: {
      type: [String],
      default: []
      /*
        Example:
        ["feedback.read", "feedback.write", "analytics.view"]
        You can define your own scope list.
      */
    },

    allowedIPs: {
      type: [String],
      default: []
      // optional whitelisting e.g., ["192.168.1.1"]
    },

    rateLimitPerMinute: {
      type: Number,
      default: 60
    },

    lastUsedAt: {
      type: Date,
      default: null
    },

    isActive: {
      type: Boolean,
      default: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    expiresAt: {
      type: Date,
      default: null // null means no expiry
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true }
);

apiKeySchema.index({ businessId: 1 });
apiKeySchema.index({ key: 1 });

const APIKey = mongoose.model("APIKey", apiKeySchema);
export default APIKey;
