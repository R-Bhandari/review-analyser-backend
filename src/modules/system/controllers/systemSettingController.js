import SystemSetting from "../models/systemSettingModel.js";

// ➤ Create System Setting
export const createSystemSetting = async (req, res) => {
  try {
    const exists = await SystemSetting.findOne({ key: req.body.key });

    if (exists)
      return res.status(400).json({
        success: false,
        message: "Setting with this key already exists"
      });

    const setting = await SystemSetting.create(req.body);

    res.status(201).json({
      success: true,
      message: "System setting created successfully",
      data: setting
    });
  } catch (error) {
    console.error("Error creating setting:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get all settings
export const getAllSystemSettings = async (req, res) => {
  try {
    const list = await SystemSetting.find().sort({ category: 1 });

    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get setting by key
export const getSystemSettingByKey = async (req, res) => {
  try {
    const setting = await SystemSetting.findOne({ key: req.params.key });

    if (!setting)
      return res.status(404).json({
        success: false,
        message: "Setting not found"
      });

    res.status(200).json({ success: true, data: setting });
  } catch (error) {
    console.error("Error fetching setting:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Update setting
export const updateSystemSetting = async (req, res) => {
  try {
    const updated = await SystemSetting.findOneAndUpdate(
      { key: req.params.key },
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "System setting updated",
      data: updated
    });
  } catch (error) {
    console.error("Error updating setting:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Delete setting
export const deleteSystemSetting = async (req, res) => {
  try {
    const deleted = await SystemSetting.findOneAndDelete({
      key: req.params.key
    });

    if (!deleted)
      return res.status(404).json({
        success: false,
        message: "Setting not found"
      });

    res.status(200).json({
      success: true,
      message: "System setting deleted"
    });
  } catch (error) {
    console.error("Error deleting setting:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
