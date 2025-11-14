import ErrorLog from "../models/errorLogModel.js";

// Create error log manually (or via middleware)
export const createErrorLog = async (req, res) => {
  try {
    const log = await ErrorLog.create(req.body);

    res.status(201).json({
      success: true,
      message: "Error logged",
      data: log
    });
  } catch (error) {
    console.error("Error saving error log:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all error logs
export const getAllErrorLogs = async (req, res) => {
  try {
    const logs = await ErrorLog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error("Error fetching error logs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get error log by ID
export const getErrorLogById = async (req, res) => {
  try {
    const log = await ErrorLog.findById(req.params.id);
    if (!log)
      return res.status(404).json({ success: false, message: "Error log not found" });

    res.status(200).json({ success: true, data: log });
  } catch (error) {
    console.error("Error fetching error log:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark an error as resolved
export const resolveErrorLog = async (req, res) => {
  try {
    const resolved = await ErrorLog.findByIdAndUpdate(
      req.params.id,
      {
        resolved: true,
        resolvedAt: Date.now(),
        resolvedBy: req.body.resolvedBy
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Error marked as resolved",
      data: resolved
    });
  } catch (error) {
    console.error("Error resolving error log:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
