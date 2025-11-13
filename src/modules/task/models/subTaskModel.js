// modules/task/models/subTaskModel.js

import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "Task ID is required"],
    },

    title: {
      type: String,
      required: [true, "Subtask title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: false,
      trim: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    dueDate: {
      type: Date,
      required: false,
    },

    completedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const SubTask = mongoose.model("SubTask", subTaskSchema);
export default SubTask;
