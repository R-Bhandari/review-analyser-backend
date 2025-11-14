import { nanoid } from "nanoid";
import APIKey from "../models/apiKeyModel.js";

// Create new API key
export const createApiKey = async (req, res) => {
  try {
    const generatedKey = `rk_${nanoid(32)}`; // similar to Stripe keys

    const newKey = await APIKey.create({
      ...req.body,
      key: generatedKey
    });

    res.status(201).json({
      success: true,
      message: "API key created",
      data: newKey
    });
  } catch (error) {
    console.error("Error creating API key:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all keys
export const getAllApiKeys = async (req, res) => {
  try {
    const keys = await APIKey.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: keys });
  } catch (error) {
    console.error("Error getting API keys:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get by business
export const getApiKeysByBusiness = async (req, res) => {
  try {
    const keys = await APIKey.find({ businessId: req.params.businessId }).sort({
      createdAt: -1
    });

    res.status(200).json({ success: true, data: keys });
  } catch (error) {
    console.error("Error fetching business API keys:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get by ID
export const getApiKeyById = async (req, res) => {
  try {
    const key = await APIKey.findById(req.params.id);

    if (!key)
      return res.status(404).json({ success: false, message: "API key not found" });

    res.status(200).json({ success: true, data: key });
  } catch (error) {
    console.error("Error fetching API key:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update API key (change scopes, rate-limit, name, expiry)
export const updateApiKey = async (req, res) => {
  try {
    const updated = await APIKey.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: "API key updated",
      data: updated
    });
  } catch (error) {
    console.error("Error updating API key:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle activate/deactivate
export const toggleApiKeyStatus = async (req, res) => {
  try {
    const key = await APIKey.findById(req.params.id);
    if (!key) return res.status(404).json({ success: false, message: "API key not found" });

    key.isActive = !key.isActive;
    await key.save();

    res.status(200).json({
      success: true,
      message: `API key ${key.isActive ? "activated" : "deactivated"}`,
      data: key
    });
  } catch (error) {
    console.error("Error toggling API key:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete API key
export const deleteApiKey = async (req, res) => {
  try {
    await APIKey.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "API key deleted"
    });
  } catch (error) {
    console.error("Error deleting API key:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
