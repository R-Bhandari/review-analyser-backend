// modules/logs/models/errorLogModel.js

import mongoose from "mongoose";

const errorLogSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },

    stack: {
      type: String,
      required: false
    },

    service: {
      type: String, 
      enum: [
        "api",
        "database",
        "integration",
        "cron",
        "webhook",
        "payment",
        "auth",
        "task-runner",
        "unknown"
      ],
      default: "unknown"
    },

    integrationName: {
      type: String,
      required: false // e.g. "razorpay", "whatsapp"
    },

    endpoint: {
      type: String,
      required: false // API route where error occurred
    },

    method: {
      type: String,
      required: false
    },

    statusCode: {
      type: Number,
      required: false
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },

    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: false
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium"
    },

    resolved: {
      type: Boolean,
      default: false
    },

    resolvedAt: {
      type: Date
    },

    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

errorLogSchema.index({ service: 1, createdAt: -1 });

const ErrorLog = mongoose.model("ErrorLog", errorLogSchema);
export default ErrorLog;
