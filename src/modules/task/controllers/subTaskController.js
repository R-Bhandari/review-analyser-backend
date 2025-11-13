import SubTask from "../models/subTaskModel.js";

// ➤ Create SubTask
export const createSubTask = async (req, res) => {
  try {
    const subtask = await SubTask.create(req.body);
    res.status(201).json({
      success: true,
      message: "Subtask created successfully",
      data: subtask,
    });
  } catch (error) {
    console.error("Error creating subtask:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get SubTasks by Task ID
export const getSubTasksByTask = async (req, res) => {
  try {
    const subtasks = await SubTask.find({ taskId: req.params.taskId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: subtasks });
  } catch (error) {
    console.error("Error fetching subtasks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Update SubTask
export const updateSubTask = async (req, res) => {
  try {
    const updated = await SubTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: "Subtask updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating subtask:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete SubTask
export const deleteSubTask = async (req, res) => {
  try {
    const deleted = await SubTask.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Subtask not found" });

    res.status(200).json({ success: true, message: "Subtask deleted successfully" });
  } catch (error) {
    console.error("Error deleting subtask:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
