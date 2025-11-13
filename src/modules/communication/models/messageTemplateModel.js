// modules/communication/models/messageTemplateModel.js

import mongoose from "mongoose";

const messageTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Template name is required"],
      trim: true,
      unique: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["email", "sms", "whatsapp", "push", "system"],
    },

    subject: {
      type: String,
      required: false, // Only used if type=email
      trim: true,
    },

    body_text: {
      type: String,
      required: false, // useful for SMS, WhatsApp, system
    },

    body_html: {
      type: String,
      required: false, // useful for email content
    },

    variables: {
      type: [String], // e.g. ["{{customerName}}", "{{branchName}}"]
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

const MessageTemplate = mongoose.model("MessageTemplate", messageTemplateSchema);
export default MessageTemplate;
