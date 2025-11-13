import ResolutionLog from "../models/resolutionLogModel.js";

// ➤ Create a log entry
export const createResolutionLog = async (req, res) => {
  try {
    const log = await ResolutionLog.create(req.body);

    res.status(201).json({
      success: true,
      message: "Resolution log added successfully",
      data: log,
    });
  } catch (error) {
    console.error("Error creating resolution log:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all logs for a task
export const getLogsByTask = async (req, res) => {
  try {
    const logs = await ResolutionLog.find({ taskId: req.params.taskId })
      .sort({ createdAt: 1 }); // chronological order (oldest → newest)

    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error("Error getting logs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete a log entry
export const deleteResolutionLog = async (req, res) => {
  try {
    const deleted = await ResolutionLog.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Log not found" });

    res.status(200).json({ success: true, message: "Resolution log deleted successfully" });
  } catch (error) {
    console.error("Error deleting log:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
