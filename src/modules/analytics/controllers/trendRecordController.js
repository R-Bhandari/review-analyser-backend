import TrendRecord from "../models/trendRecordModel.js";

// ➤ Create or Update Trend Record
export const upsertTrendRecord = async (req, res) => {
  try {
    const { business, branch, periodType, periodStart } = req.body;

    let record = await TrendRecord.findOne({ business, branch, periodType, periodStart });
    if (record) {
      record = await TrendRecord.findByIdAndUpdate(record._id, req.body, { new: true });
      return res.status(200).json({ success: true, message: "Trend record updated", data: record });
    }

    const newRecord = await TrendRecord.create(req.body);
    res.status(201).json({ success: true, message: "Trend record created", data: newRecord });
  } catch (error) {
    console.error("Error saving trend record:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get All Trend Records (with optional filters)
export const getTrendRecords = async (req, res) => {
  try {
    const { businessId, branchId, periodType } = req.query;
    const filter = {};
    if (businessId) filter.business = businessId;
    if (branchId) filter.branch = branchId;
    if (periodType) filter.periodType = periodType;

    const records = await TrendRecord.find(filter)
      .populate("business", "name")
      .populate("branch", "name")
      .sort({ periodStart: 1 });

    res.status(200).json({ success: true, data: records });
  } catch (error) {
    console.error("Error fetching trend records:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get Records for a Date Range
export const getTrendRecordsByRange = async (req, res) => {
  try {
    const { businessId, start, end, periodType } = req.query;
    if (!businessId)
      return res.status(400).json({ success: false, message: "Business ID required" });

    const filter = {
      business: businessId,
      periodStart: { $gte: new Date(start) },
      periodEnd: { $lte: new Date(end) },
    };
    if (periodType) filter.periodType = periodType;

    const records = await TrendRecord.find(filter).sort({ periodStart: 1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    console.error("Error fetching trend records by range:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Trend Record
export const deleteTrendRecord = async (req, res) => {
  try {
    const deleted = await TrendRecord.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Record not found" });

    res.status(200).json({ success: true, message: "Trend record deleted" });
  } catch (error) {
    console.error("Error deleting trend record:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
