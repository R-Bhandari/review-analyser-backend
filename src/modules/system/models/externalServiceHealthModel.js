// modules/system/models/externalServiceHealthModel.js

import mongoose from "mongoose";

const externalServiceHealthSchema = new mongoose.Schema(
  {
    integrationName: {
      type: String,              // must match IntegrationConfig.name
      required: true,
      trim: true
    },

    environment: {
      type: String,
      enum: ["test", "live"],
      default: "test"
    },

    status: {
      type: String,
      enum: ["up", "down", "degraded"],
      default: "up"
    },

    latencyMs: {
      type: Number,
      default: null
    },

    lastCheckedAt: {
      type: Date,
      default: Date.now
    },

    lastSuccessAt: {
      type: Date,
      required: false
    },

    errorMessage: {
      type: String,
      required: false,
      trim: true
    },

    errorCount: {
      type: Number,
      default: 0
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true }
);

externalServiceHealthSchema.index({ integrationName: 1, environment: 1 });

const ExternalServiceHealth = mongoose.model(
  "ExternalServiceHealth",
  externalServiceHealthSchema
);
export default ExternalServiceHealth;
