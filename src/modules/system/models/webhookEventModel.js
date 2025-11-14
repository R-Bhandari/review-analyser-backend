// modules/logs/models/webhookEventModel.js

import mongoose from "mongoose";

const webhookEventSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      enum: [
        "razorpay",
        "stripe",
        "whatsapp",
        "twilio",
        "msg91",
        "smtp",
        "openai",
        "custom"
      ]
    },

    eventId: {
      type: String,
      required: false,
      unique: false,    // different providers can reuse event format
      sparse: true
    },

    eventType: {
      type: String,
      required: false,
      trim: true
    },

    payload: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },

    // Track status of processing
    processingStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending"
    },

    attempts: {
      type: Number,
      default: 0
    },

    lastAttemptAt: {
      type: Date
    },

    errorMessage: {
      type: String,
      required: false
    },

    // idempotency keys help prevent double-processing
    idempotencyKey: {
      type: String,
      required: false,
      index: true
    },

    receivedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

webhookEventSchema.index({ source: 1, eventId: 1 });

const WebhookEvent = mongoose.model("WebhookEvent", webhookEventSchema);
export default WebhookEvent;
