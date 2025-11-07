import TrendInsight from "../models/trendInsightModel.js";
import AIConfig from "../models/aiConfigModel.js";
import dotenv from "dotenv";
dotenv.config();

// Placeholder for AI integration
// import openai from "../utils/aiClient.js"; (future)

export const createTrendInsight = async (req, res) => {
  try {
    const insight = await TrendInsight.create(req.body);
    res.status(201).json({ success: true, message: "Trend insight created", data: insight });
  } catch (error) {
    console.error("Error creating insight:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getAllTrendInsights = async (req, res) => {
  try {
    const { businessId, branchId, periodType } = req.query;
    const filter = {};
    if (businessId) filter.business = businessId;
    if (branchId) filter.branch = branchId;
    if (periodType) filter.periodType = periodType;

    const insights = await TrendInsight.find(filter)
      .populate("business", "name")
      .populate("branch", "name")
      .populate("aiConfigRef", "provider modelName")
      .sort({ periodStart: -1 });

    res.status(200).json({ success: true, data: insights });
  } catch (error) {
    console.error("Error fetching insights:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getTrendInsightById = async (req, res) => {
  try {
    const insight = await TrendInsight.findById(req.params.id)
      .populate("business", "name")
      .populate("aiConfigRef", "provider modelName");

    if (!insight)
      return res.status(404).json({ success: false, message: "Insight not found" });

    res.status(200).json({ success: true, data: insight });
  } catch (error) {
    console.error("Error fetching insight by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteTrendInsight = async (req, res) => {
  try {
    const deleted = await TrendInsight.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Insight not found" });

    res.status(200).json({ success: true, message: "Insight deleted successfully" });
  } catch (error) {
    console.error("Error deleting insight:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Simulate AI-Generated Insight (future-ready)
export const generateTrendInsight = async (req, res) => {
  try {
    const { businessId, periodType, text, metrics } = req.body;

    // 1. Get AI configuration
    const aiConfig = await AIConfig.findOne({ business: businessId });
    if (!aiConfig)
      return res.status(404).json({ success: false, message: "AI config not found" });

    // 2. Placeholder for AI-generated insight
    const aiInsight = `📈 Insight (${periodType}): ${text.slice(0, 120)}...`;

    // 3. Save
    const insight = await TrendInsight.create({
      business: businessId,
      periodType,
      insightText: aiInsight,
      metrics,
      aiProvider: aiConfig.provider,
      modelName: aiConfig.modelName,
      aiConfigRef: aiConfig._id,
    });

    res.status(201).json({ success: true, message: "AI-generated insight created", data: insight });
  } catch (error) {
    console.error("Error generating trend insight:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
