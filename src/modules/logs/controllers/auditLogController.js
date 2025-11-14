import AuditLog from "../models/auditLogModel.js";

// Create log entry
export const createAuditLog = async (req, res) => {
  try {
    const log = await AuditLog.create(req.body);

    res.status(201).json({
      success: true,
      message: "Audit log created",
      data: log
    });
  } catch (error) {
    console.error("Error creating audit log:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all logs
export const getAllAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: logs
    });
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get by ID
export const getAuditLogById = async (req, res) => {
  try {
    const log = await AuditLog.findById(req.params.id);
    if (!log)
      return res.status(404).json({ success: false, message: "Log not found" });

    res.status(200).json({ success: true, data: log });
  } catch (error) {
    console.error("Error fetching audit log:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
