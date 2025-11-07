import AutoSummary from "../models/autoSummaryModel.js";
import AIConfig from "../models/aiConfigModel.js";
import dotenv from "dotenv";
dotenv.config();

// For later: import OpenAI client (currently placeholder)
let openaiClient = null;
// Future setup: import from utils/aiClient.js once you add API key

// ➤ Create or save summary manually (for now)
export const createAutoSummary = async (req, res) => {
  try {
    const summary = await AutoSummary.create(req.body);
    res.status(201).json({ success: true, message: "Auto summary created", data: summary });
  } catch (error) {
    console.error("Error creating summary:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Fetch all summaries (with filters)
export const getAllSummaries = async (req, res) => {
  try {
    const { businessId, branchId, summaryType } = req.query;
    const filter = {};
    if (businessId) filter.business = businessId;
    if (branchId) filter.branch = branchId;
    if (summaryType) filter.summaryType = summaryType;

    const summaries = await AutoSummary.find(filter)
      .populate("business", "name")
      .populate("branch", "name")
      .populate("aiConfigRef", "provider modelName")
      .sort({ generatedAt: -1 });

    res.status(200).json({ success: true, data: summaries });
  } catch (error) {
    console.error("Error fetching summaries:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get summary by ID
export const getSummaryById = async (req, res) => {
  try {
    const summary = await AutoSummary.findById(req.params.id)
      .populate("business", "name")
      .populate("aiConfigRef", "provider modelName");
    if (!summary)
      return res.status(404).json({ success: false, message: "Summary not found" });

    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    console.error("Error fetching summary by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete summary
export const deleteSummary = async (req, res) => {
  try {
    const deleted = await AutoSummary.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Summary not found" });

    res.status(200).json({ success: true, message: "Summary deleted successfully" });
  } catch (error) {
    console.error("Error deleting summary:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ (Future) Generate summary via AI model (placeholder)
export const generateSummaryUsingAI = async (req, res) => {
  try {
    const { businessId, text, summaryType } = req.body;

    // 1. Get business AI config
    const aiConfig = await AIConfig.findOne({ business: businessId });
    if (!aiConfig)
      return res.status(404).json({ success: false, message: "AI config not found" });

    // 2. Normally, here we would use OpenAI or any other provider
    // Placeholder summary simulation:
    const aiSummary = `🧠 AI Summary (${summaryType}): ${text.slice(0, 100)}...`;

    // 3. Save result
    const summary = await AutoSummary.create({
      business: businessId,
      summaryType,
      sourceModel: "Feedback",
      summaryText: aiSummary,
      aiProvider: aiConfig.provider,
      modelName: aiConfig.modelName,
      aiConfigRef: aiConfig._id,
    });

    res.status(201).json({ success: true, message: "AI summary generated", data: summary });
  } catch (error) {
    console.error("Error generating AI summary:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
