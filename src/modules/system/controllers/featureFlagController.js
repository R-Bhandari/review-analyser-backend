import FeatureFlag from "../models/featureFlagModel.js";

/* Create flag */
export const createFeatureFlag = async (req, res) => {
  try {
    const exists = await FeatureFlag.findOne({ key: req.body.key });
    if (exists) return res.status(400).json({ success: false, message: "Flag key exists" });
    const flag = await FeatureFlag.create(req.body);
    res.status(201).json({ success: true, data: flag });
  } catch (error) {
    console.error("Error creating flag:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* List flags */
export const getAllFeatureFlags = async (req, res) => {
  try {
    const flags = await FeatureFlag.find().sort({ key: 1 });
    res.status(200).json({ success: true, data: flags });
  } catch (error) {
    console.error("Error fetching flags:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Get by key */
export const getFeatureFlagByKey = async (req, res) => {
  try {
    const flag = await FeatureFlag.findOne({ key: req.params.key });
    if (!flag) return res.status(404).json({ success: false, message: "Flag not found" });
    res.status(200).json({ success: true, data: flag });
  } catch (error) {
    console.error("Error fetching flag:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Update flag */
export const updateFeatureFlag = async (req, res) => {
  try {
    const updated = await FeatureFlag.findOneAndUpdate({ key: req.params.key }, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating flag:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Delete flag */
export const deleteFeatureFlag = async (req, res) => {
  try {
    const deleted = await FeatureFlag.findOneAndDelete({ key: req.params.key });
    if (!deleted) return res.status(404).json({ success: false, message: "Flag not found" });
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    console.error("Error deleting flag:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
