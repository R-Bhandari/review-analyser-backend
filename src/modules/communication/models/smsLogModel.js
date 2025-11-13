// modules/communication/models/smsLogModel.js

import mongoose from "mongoose";

const smsLogSchema = new mongoose.Schema(
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
      required: [true, "SMS message body is required"],
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

const SMSLog = mongoose.model("SMSLog", smsLogSchema);
export default SMSLog;
