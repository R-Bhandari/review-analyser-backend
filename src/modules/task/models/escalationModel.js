// modules/task/models/escalationModel.js

import mongoose from "mongoose";

const escalationSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "Task ID is required"],
    },

    level: {
      type: Number,
      required: [true, "Escalation level is required"],
      default: 1,
    },

    escalateTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Escalation target user is required"],
    },

    triggerType: {
      type: String,
      enum: ["time", "rating", "priority", "inactivity", "subtask", "manual"],
      required: true,
    },

    triggerThreshold: {
      type: Number, // Hours for time, rating threshold for rating
      required: false,
    },

    status: {
      type: String,
      enum: ["pending", "triggered", "completed"],
      default: "pending",
    },

    triggeredAt: {
      type: Date,
      required: false,
    },

    notes: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const Escalation = mongoose.model("Escalation", escalationSchema);
export default Escalation;
