// modules/communication/models/notificationModel.js

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: false,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    template_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessageTemplate",
      required: false,
    },

    type: {
      type: String,
      required: [true, "Notification type is required"],
      enum: ["email", "sms", "whatsapp", "push", "system"],
    },

    medium: {
      type: String,
      default: null,
    },

    title: {
      type: String,
      required: false,
      trim: true,
    },

    message: {
      type: String,
      required: false,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "sent", "delivered", "failed"],
      default: "pending",
    },

    meta: {
      type: Object,
      default: {},
    },

    scheduled_at: {
      type: Date,
      default: null,
    },

    sent_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
