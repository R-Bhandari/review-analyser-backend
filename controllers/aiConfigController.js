import AIConfig from "../models/aiConfigModel.js";

// ➤ Create or update AI configuration
export const upsertAIConfig = async (req, res) => {
  try {
    const { business } = req.body;

    let config = await AIConfig.findOne({ business });
    if (config) {
      config = await AIConfig.findByIdAndUpdate(config._id, req.body, { new: true });
      return res.status(200).json({ success: true, message: "AI config updated", data: config });
    }

    const newConfig = await AIConfig.create(req.body);
    res.status(201).json({ success: true, message: "AI config created", data: newConfig });
  } catch (error) {
    console.error("Error saving AI config:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get AI configuration for a business
export const getAIConfig = async (req, res) => {
  try {
    const { businessId } = req.query;
    if (!businessId)
      return res.status(400).json({ success: false, message: "Business ID required" });

    const config = await AIConfig.findOne({ business: businessId }).select("-apiKey");
    if (!config)
      return res.status(404).json({ success: false, message: "AI configuration not found" });

    res.status(200).json({ success: true, data: config });
  } catch (error) {
    console.error("Error fetching AI config:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete AI configuration
export const deleteAIConfig = async (req, res) => {
  try {
    const deleted = await AIConfig.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Config not found" });

    res.status(200).json({ success: true, message: "AI configuration deleted" });
  } catch (error) {
    console.error("Error deleting AI config:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
