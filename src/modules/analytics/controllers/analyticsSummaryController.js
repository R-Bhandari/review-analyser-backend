import AnalyticsSummary from "../models/analyticsSummaryModel.js";

// ➤ Create or update a summary
export const upsertSummary = async (req, res) => {
  try {
    const { business, branch, periodType, periodStart } = req.body;

    let summary = await AnalyticsSummary.findOne({ business, branch, periodType, periodStart });
    if (summary) {
      summary = await AnalyticsSummary.findByIdAndUpdate(summary._id, req.body, { new: true });
      return res.status(200).json({ success: true, message: "Summary updated", data: summary });
    }

    const newSummary = await AnalyticsSummary.create(req.body);
    res.status(201).json({ success: true, message: "Summary created", data: newSummary });
  } catch (error) {
    console.error("Error saving summary:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all summaries (optional filters)
export const getSummaries = async (req, res) => {
  try {
    const { businessId, branchId, periodType } = req.query;
    const filter = {};
    if (businessId) filter.business = businessId;
    if (branchId) filter.branch = branchId;
    if (periodType) filter.periodType = periodType;

    const summaries = await AnalyticsSummary.find(filter)
      .populate("business", "name")
      .populate("branch", "name")
      .sort({ periodStart: -1 });

    res.status(200).json({ success: true, data: summaries });
  } catch (error) {
    console.error("Error fetching summaries:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get summaries in a date range
export const getSummariesByRange = async (req, res) => {
  try {
    const { businessId, start, end } = req.query;
    if (!businessId) return res.status(400).json({ success: false, message: "Business ID required" });

    const summaries = await AnalyticsSummary.find({
      business: businessId,
      periodStart: { $gte: new Date(start) },
      periodEnd: { $lte: new Date(end) },
    }).sort({ periodStart: 1 });

    res.status(200).json({ success: true, data: summaries });
  } catch (error) {
    console.error("Error fetching range summaries:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete a summary
export const deleteSummary = async (req, res) => {
  try {
    const deleted = await AnalyticsSummary.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Summary not found" });

    res.status(200).json({ success: true, message: "Summary deleted successfully" });
  } catch (error) {
    console.error("Error deleting summary:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
