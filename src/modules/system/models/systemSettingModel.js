// modules/system/models/systemSettingModel.js

import mongoose from "mongoose";

const systemSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    label: {
      type: String,
      trim: true,
      required: false
    },

    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },

    valueType: {
      type: String,
      enum: ["string", "number", "boolean", "json"],
      default: "string"
    },

    description: {
      type: String,
      trim: true
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },

    isEditable: {
      type: Boolean,
      default: true
    },

    category: {
      type: String,
      enum: [
        "system",
        "billing",
        "security",
        "notifications",
        "feedback",
        "integrations",
        "ui",
        "limits"
      ],
      default: "system"
    }
  },
  { timestamps: true }
);

const SystemSetting = mongoose.model("SystemSetting", systemSettingSchema);
export default SystemSetting;
