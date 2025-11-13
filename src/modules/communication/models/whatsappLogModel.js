// modules/communication/models/whatsappLogModel.js

import mongoose from "mongoose";

const whatsappLogSchema = new mongoose.Schema(
  {
    notification_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
      required: false,
    },

    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: false,
    },

    to: {
      type: String,
      required: [true, "Receiver phone number is required"],
      trim: true,
    },

    message: {
      type: String,
      required: [true, "Message body is required"],
    },

    template_used: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessageTemplate",
      required: false,
    },

    status: {
      type: String,
      enum: ["pending", "sent", "delivered", "failed"],
      default: "pending",
    },

    api_response: {
      type: Object,
      default: {},
    },

    sent_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const WhatsAppLog = mongoose.model("WhatsAppLog", whatsappLogSchema);
export default WhatsAppLog;
