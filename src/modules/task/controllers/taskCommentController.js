import TaskComment from "../models/taskCommentModel.js";

// ➤ Create Comment
export const addComment = async (req, res) => {
  try {
    const comment = await TaskComment.create(req.body);

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get All Comments of a Task
export const getCommentsByTask = async (req, res) => {
  try {
    const comments = await TaskComment.find({ taskId: req.params.taskId })
      .populate("postedBy", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const deleted = await TaskComment.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Comment not found" });

    res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
