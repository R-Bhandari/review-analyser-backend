// modules/task/models/resolutionLogModel.js

import mongoose from "mongoose";

const resolutionLogSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "Task ID is required"],
    },

    action: {
      type: String,
      required: [true, "Action is required"],
      trim: true,
    },

    description: {
      type: String,
      required: false,
      trim: true,
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User who performed the action is required"],
    },

    fromStatus: {
      type: String,
      required: false
    },

    toStatus: {
      type: String,
      required: false
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ResolutionLog = mongoose.model("ResolutionLog", resolutionLogSchema);
export default ResolutionLog;
