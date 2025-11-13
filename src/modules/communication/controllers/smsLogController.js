import SMSLog from "../models/smsLogModel.js";

// ➤ Create SMS Log
export const createSMSLog = async (req, res) => {
  try {
    const log = await SMSLog.create(req.body);

    res.status(201).json({
      success: true,
      message: "SMS log created successfully",
      data: log,
    });
  } catch (error) {
    console.error("Error creating SMS log:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get All SMS Logs
export const getAllSMSLogs = async (req, res) => {
  try {
    const logs = await SMSLog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error("Error fetching SMS logs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get SMS Log By ID
export const getSMSLogById = async (req, res) => {
  try {
    const log = await SMSLog.findById(req.params.id);
    if (!log)
      return res.status(404).json({ success: false, message: "SMS log not found" });

    res.status(200).json({ success: true, data: log });
  } catch (error) {
    console.error("Error fetching SMS log:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete SMS Log
export const deleteSMSLog = async (req, res) => {
  try {
    const log = await SMSLog.findByIdAndDelete(req.params.id);
    if (!log)
      return res.status(404).json({ success: false, message: "SMS log not found" });

    res.status(200).json({ success: true, message: "SMS log deleted successfully" });
  } catch (error) {
    console.error("Error deleting SMS log:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
