// modules/system/models/integrationConfigModel.js

import mongoose from "mongoose";

const integrationConfigSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,      // e.g. "razorpay", "sendgrid", "twilio", "openai"
      trim: true
    },

    provider: {
      type: String,
      required: true,
      trim: true
    },

    environment: {
      type: String,
      enum: ["test", "live", "sandbox", "production"],
      default: "test"
    },

    baseUrl: {
      type: String,
      required: false,
      trim: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    defaultParams: {
      type: mongoose.Schema.Types.Mixed,   // JSON to store special configs
      default: {}
    },

    retryPolicy: {
      retries: { type: Number, default: 3 },
      timeout: { type: Number, default: 5000 }
    },

    version: {
      type: String,
      default: "v1"
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },

    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

const IntegrationConfig = mongoose.model("IntegrationConfig", integrationConfigSchema);
export default IntegrationConfig;
