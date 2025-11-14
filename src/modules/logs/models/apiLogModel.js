// modules/logs/models/apiLogModel.js

import mongoose from "mongoose";

const apiLogSchema = new mongoose.Schema(
  {
    // inbound or outbound
    direction: {
      type: String,
      enum: ["incoming", "outgoing"],
      required: true
    },

    // request path or external url
    endpoint: {
      type: String,
      required: true
    },

    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      required: true
    },

    statusCode: {
      type: Number,
      required: false
    },

    latencyMs: {
      type: Number,
      required: false
    },

    integrationName: {
      type: String,
      required: false // e.g. "razorpay", "openai"
    },

    requestPayload: {
      type: mongoose.Schema.Types.Mixed,
      required: false
    },

    responsePayload: {
      type: mongoose.Schema.Types.Mixed,
      required: false
    },

    ipAddress: {
      type: String,
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

    requestHeaders: {
      type: mongoose.Schema.Types.Mixed,
      required: false
    },

    errorMessage: {
      type: String,
      required: false
    },

    isError: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

apiLogSchema.index({ direction: 1, endpoint: 1, createdAt: -1 });

const APILog = mongoose.model("APILog", apiLogSchema);
export default APILog;
