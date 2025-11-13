// modules/task/models/taskModel.js

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: false,
      trim: true,
    },

    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "on-hold", "completed", "cancelled"],
      default: "pending",
    },

    source: {
      type: String,
      enum: ["feedback", "manual", "system"],
      default: "manual",
    },

    feedback_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
      required: false,
    },

    dueDate: {
      type: Date,
      required: false,
    },

    completedAt: {
      type: Date,
      required: false,
    },

    isEscalated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
