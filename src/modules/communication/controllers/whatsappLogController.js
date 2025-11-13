import WhatsAppLog from "../models/whatsappLogModel.js";

// ➤ Create WhatsApp Log
export const createWhatsAppLog = async (req, res) => {
  try {
    const log = await WhatsAppLog.create(req.body);

    res.status(201).json({
      success: true,
      message: "WhatsApp log created successfully",
      data: log,
    });
  } catch (error) {
    console.error("Error creating WhatsApp log:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get All Logs
export const getAllWhatsAppLogs = async (req, res) => {
  try {
    const logs = await WhatsAppLog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error("Error fetching WhatsApp logs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get Log By ID
export const getWhatsAppLogById = async (req, res) => {
  try {
    const log = await WhatsAppLog.findById(req.params.id);
    if (!log)
      return res.status(404).json({ success: false, message: "WhatsApp log not found" });

    res.status(200).json({ success: true, data: log });
  } catch (error) {
    console.error("Error fetching log:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Log
export const deleteWhatsAppLog = async (req, res) => {
  try {
    const log = await WhatsAppLog.findByIdAndDelete(req.params.id);
    if (!log)
      return res.status(404).json({ success: false, message: "WhatsApp log not found" });

    res.status(200).json({ success: true, message: "Log deleted successfully" });
  } catch (error) {
    console.error("Error deleting log:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
