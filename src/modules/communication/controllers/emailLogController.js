import EmailLog from "../models/emailLogModel.js";

// ➤ Create Email Log
export const createEmailLog = async (req, res) => {
  try {
    const log = await EmailLog.create(req.body);

    res.status(201).json({
      success: true,
      message: "Email log created successfully",
      data: log,
    });
  } catch (error) {
    console.error("Error creating email log:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all logs
export const getAllEmailLogs = async (req, res) => {
  try {
    const logs = await EmailLog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error("Error fetching email logs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get log by ID
export const getEmailLogById = async (req, res) => {
  try {
    const log = await EmailLog.findById(req.params.id);
    if (!log)
      return res.status(404).json({ success: false, message: "Email log not found" });

    res.status(200).json({ success: true, data: log });
  } catch (error) {
    console.error("Error fetching email log:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete log
export const deleteEmailLog = async (req, res) => {
  try {
    const log = await EmailLog.findByIdAndDelete(req.params.id);
    if (!log)
      return res.status(404).json({ success: false, message: "Email log not found" });

    res.status(200).json({ success: true, message: "Email log deleted successfully" });
  } catch (error) {
    console.error("Error deleting email log:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
