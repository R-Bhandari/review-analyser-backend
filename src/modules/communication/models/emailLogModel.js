// modules/communication/models/emailLogModel.js

import mongoose from "mongoose";

const emailLogSchema = new mongoose.Schema(
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
      required: [true, "Receiver email address is required"],
      trim: true,
    },

    subject: {
      type: String,
      required: false,
      trim: true,
    },

    body_html: {
      type: String,
      required: false,
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

const EmailLog = mongoose.model("EmailLog", emailLogSchema);
export default EmailLog;
