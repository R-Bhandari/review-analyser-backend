import IntegrationConfig from "../models/integrationConfigModel.js";

// ➤ Create Integration Config
export const createIntegrationConfig = async (req, res) => {
  try {
    const exists = await IntegrationConfig.findOne({ name: req.body.name });

    if (exists)
      return res.status(400).json({
        success: false,
        message: "Integration with this name already exists"
      });

    const config = await IntegrationConfig.create(req.body);

    res.status(201).json({
      success: true,
      message: "Integration configuration created successfully",
      data: config
    });
  } catch (error) {
    console.error("Error creating integration config:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get All Integrations
export const getAllIntegrationConfigs = async (req, res) => {
  try {
    const list = await IntegrationConfig.find().sort({ name: 1 });

    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching integrations:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get Integrations by Name
export const getIntegrationConfigByName = async (req, res) => {
  try {
    const config = await IntegrationConfig.findOne({ name: req.params.name });

    if (!config)
      return res.status(404).json({
        success: false,
        message: "Integration config not found"
      });

    res.status(200).json({ success: true, data: config });
  } catch (error) {
    console.error("Error fetching integration config:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Update Integration
export const updateIntegrationConfig = async (req, res) => {
  try {
    const updated = await IntegrationConfig.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Integration config updated successfully",
      data: updated
    });
  } catch (error) {
    console.error("Error updating integration config:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Delete Integration
export const deleteIntegrationConfig = async (req, res) => {
  try {
    const deleted = await IntegrationConfig.findOneAndDelete({
      name: req.params.name
    });

    if (!deleted)
      return res.status(404).json({
        success: false,
        message: "Integration config not found"
      });

    res.status(200).json({
      success: true,
      message: "Integration deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting integration config:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
