import SentimentSummary from "../models/sentimentSummaryModel.js";
import Feedback from "../models/feedbackModel.js";

// ➤ Create a new sentiment summary
export const createSentimentSummary = async (req, res) => {
  try {
    const {
      feedbackId,
      businessId,
      branchId,
      type,
      period,
      summaryText,
      sentiment,
      generatedBy,
    } = req.body;

    const summary = await SentimentSummary.create({
      feedbackId,
      businessId,
      branchId,
      type,
      period,
      summaryText,
      sentiment,
      generatedBy,
    });

    res.status(201).json({
      success: true,
      message: "Sentiment summary created successfully",
      data: summary,
    });
  } catch (error) {
    console.error("Error creating sentiment summary:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all sentiment summaries
export const getAllSummaries = async (req, res) => {
  try {
    const summaries = await SentimentSummary.find()
      .populate("businessId", "name")
      .populate("branchId", "name")
      .populate("feedbackId", "averageScore sentiment");

    res.status(200).json({ success: true, data: summaries });
  } catch (error) {
    console.error("Error fetching summaries:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get summaries by business
export const getSummariesByBusiness = async (req, res) => {
  try {
    const summaries = await SentimentSummary.find({ businessId: req.params.businessId })
      .populate("branchId", "name")
      .populate("feedbackId", "sentiment");

    res.status(200).json({ success: true, data: summaries });
  } catch (error) {
    console.error("Error fetching business summaries:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get summaries by type (Customer/Business)
export const getSummariesByType = async (req, res) => {
  try {
    const summaries = await SentimentSummary.find({ type: req.params.type });
    res.status(200).json({ success: true, data: summaries });
  } catch (error) {
    console.error("Error fetching summaries by type:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
