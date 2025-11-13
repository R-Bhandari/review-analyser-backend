// modules/task/models/taskCommentModel.js

import mongoose from "mongoose";

const taskCommentSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "Task ID is required"],
    },

    comment: {
      type: String,
      required: [true, "Comment message is required"],
      trim: true,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment author is required"],
    },

    isInternal: {
      type: Boolean,
      default: false,  
      // true → only admins/staff see
      // false → customer can see (if needed later)
    },
  },
  { timestamps: true }
);

const TaskComment = mongoose.model("TaskComment", taskCommentSchema);
export default TaskComment;
