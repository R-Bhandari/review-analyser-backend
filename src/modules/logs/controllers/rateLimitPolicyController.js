import RateLimitPolicy from "../models/rateLimitPolicyModel.js";

export const createRateLimitPolicy = async (req, res) => {
  try {
    const exists = await RateLimitPolicy.findOne({ key: req.body.key });
    if (exists)
      return res.status(400).json({ success: false, message: "Policy key already exists" });

    const policy = await RateLimitPolicy.create(req.body);

    res.status(201).json({
      success: true,
      message: "Rate limit policy created",
      data: policy
    });
  } catch (error) {
    console.error("Error creating policy:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllPolicies = async (req, res) => {
  try {
    const list = await RateLimitPolicy.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error getting policies:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPolicyByKey = async (req, res) => {
  try {
    const policy = await RateLimitPolicy.findOne({ key: req.params.key });
    if (!policy)
      return res.status(404).json({ success: false, message: "Policy not found" });

    res.status(200).json({ success: true, data: policy });
  } catch (error) {
    console.error("Error getting policy:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRateLimitPolicy = async (req, res) => {
  try {
    const updated = await RateLimitPolicy.findOneAndUpdate(
      { key: req.params.key },
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Policy updated",
      data: updated
    });
  } catch (error) {
    console.error("Error updating policy:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRateLimitPolicy = async (req, res) => {
  try {
    const deleted = await RateLimitPolicy.findOneAndDelete({
      key: req.params.key
    });

    res.status(200).json({
      success: true,
      message: "Policy deleted",
      data: deleted
    });
  } catch (error) {
    console.error("Error deleting policy:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
