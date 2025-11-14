// modules/system/models/integrationCredentialModel.js

import mongoose from "mongoose";

const integrationCredentialSchema = new mongoose.Schema(
  {
    integrationName: {
      type: String,               // must match IntegrationConfig.name
      required: true,
      trim: true
    },

    environment: {
      type: String,
      enum: ["test", "live"],
      default: "test"
    },

    credentials: {
      type: Object,               // encrypted key-value pairs
      required: true
    },

    encrypted: {
      type: Boolean,
      default: true
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },

    rotatedAt: {
      type: Date,
      default: Date.now
    },

    isActive: {
      type: Boolean,
      default: true
    },

    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

const IntegrationCredential = mongoose.model("IntegrationCredential", integrationCredentialSchema);
export default IntegrationCredential;
