import AIRequestLog from "../models/aiRequestLogModel.js";

// ➤ Create Log Entry (used by AI generation endpoints)
export const createAIRequestLog = async (req, res) => {
  try {
    const log = await AIRequestLog.create(req.body);
    res.status(201).json({ success: true, message: "AI request logged", data: log });
  } catch (error) {
    console.error("Error creating AI request log:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get All Logs (with optional filters)
export const getAllAIRequestLogs = async (req, res) => {
  try {
    const { businessId, requestType, status, provider } = req.query;
    const filter = {};
    if (businessId) filter.business = businessId;
    if (requestType) filter.requestType = requestType;
    if (status) filter.status = status;
    if (provider) filter.aiProvider = provider;

    const logs = await AIRequestLog.find(filter)
      .populate("business", "name")
      .populate("aiConfigRef", "provider modelName")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error("Error fetching AI logs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get Single Log by ID
export const getAIRequestLogById = async (req, res) => {
  try {
    const log = await AIRequestLog.findById(req.params.id)
      .populate("business", "name")
      .populate("aiConfigRef", "provider modelName");
    if (!log)
      return res.status(404).json({ success: false, message: "AI request log not found" });

    res.status(200).json({ success: true, data: log });
  } catch (error) {
    console.error("Error fetching AI request log:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Log
export const deleteAIRequestLog = async (req, res) => {
  try {
    const deleted = await AIRequestLog.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Log not found" });

    res.status(200).json({ success: true, message: "AI request log deleted successfully" });
  } catch (error) {
    console.error("Error deleting AI request log:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
