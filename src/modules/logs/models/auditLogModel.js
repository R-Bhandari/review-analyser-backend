// modules/logs/models/auditLogModel.js

import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,       // e.g. "UPDATE_SETTING", "CREATE_PLAN"
    },

    description: {
      type: String,
      required: false
    },

    module: {
      type: String,
      required: true,
      enum: [
        "system",
        "business",
        "feedback",
        "plans",
        "billing",
        "integration",
        "credentials",
        "featureflag",
        "task",
        "user",
        "auth",
        "referral",
        "rewards",
        "settings",
        "webhook",
        "cron",
        "other"
      ]
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },

    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: false
    },

    ipAddress: {
      type: String,
      required: false
    },

    userAgent: {
      type: String,
      required: false
    },

    dataBefore: {
      type: mongoose.Schema.Types.Mixed
    },

    dataAfter: {
      type: mongoose.Schema.Types.Mixed
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low"
    }
  },
  { timestamps: true }
);

auditLogSchema.index({ module: 1, createdAt: -1 });

const AuditLog = mongoose.model("AuditLog", auditLogSchema);
export default AuditLog;
