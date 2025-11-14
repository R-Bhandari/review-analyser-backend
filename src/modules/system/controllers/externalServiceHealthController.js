import ExternalServiceHealth from "../models/externalServiceHealthModel.js";

// ➤ Create or Update health status (Upsert)
export const updateExternalServiceHealth = async (req, res) => {
  try {
    const { integrationName, environment } = req.body;

    const health = await ExternalServiceHealth.findOneAndUpdate(
      { integrationName, environment },
      req.body,
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Health status updated",
      data: health
    });
  } catch (error) {
    console.error("Error updating health:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get all health statuses
export const getAllExternalServiceHealth = async (req, res) => {
  try {
    const list = await ExternalServiceHealth.find().sort({ integrationName: 1 });
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching health:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get health by integration
export const getExternalServiceHealth = async (req, res) => {
  try {
    const health = await ExternalServiceHealth.findOne({
      integrationName: req.params.integrationName,
      environment: req.params.environment || "test"
    });

    if (!health)
      return res.status(404).json({
        success: false,
        message: "Health record not found"
      });

    res.status(200).json({
      success: true,
      data: health
    });
  } catch (error) {
    console.error("Error fetching health record:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
