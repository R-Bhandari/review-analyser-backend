import APILog from "../models/apiLogModel.js";

// Log an API event
export const createAPILog = async (req, res) => {
  try {
    const log = await APILog.create(req.body);

    res.status(201).json({
      success: true,
      message: "API log created",
      data: log
    });
  } catch (error) {
    console.error("Error creating API log:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all logs (Paginated recommended later)
export const getAllAPILogs = async (req, res) => {
  try {
    const logs = await APILog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error("Error fetching API logs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get one by ID
export const getAPILogById = async (req, res) => {
  try {
    const log = await APILog.findById(req.params.id);

    if (!log)
      return res.status(404).json({
        success: false,
        message: "API log not found"
      });

    res.status(200).json({ success: true, data: log });
  } catch (error) {
    console.error("Error fetching API log:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
