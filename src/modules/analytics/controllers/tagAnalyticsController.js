import TagAnalytics from "../models/tagAnalyticsModel.js";

// ➤ Create or Update tag analytics record
export const upsertTagAnalytics = async (req, res) => {
  try {
    const { business, branch, tag } = req.body;
    let record = await TagAnalytics.findOne({ business, branch, tag });

    if (record) {
      record = await TagAnalytics.findByIdAndUpdate(record._id, req.body, { new: true });
      return res.status(200).json({ success: true, message: "Tag analytics updated", data: record });
    }

    const newRecord = await TagAnalytics.create(req.body);
    res.status(201).json({ success: true, message: "Tag analytics created", data: newRecord });
  } catch (error) {
    console.error("Error saving tag analytics:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all tag analytics (optional filters)
export const getAllTagAnalytics = async (req, res) => {
  try {
    const { businessId, branchId } = req.query;
    const filter = {};
    if (businessId) filter.business = businessId;
    if (branchId) filter.branch = branchId;

    const data = await TagAnalytics.find(filter)
      .populate("tag", "name color")
      .populate("business", "name")
      .populate("branch", "name")
      .sort({ totalFeedbacks: -1 });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching tag analytics:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get single tag analytics by ID
export const getTagAnalyticsById = async (req, res) => {
  try {
    const data = await TagAnalytics.findById(req.params.id)
      .populate("tag", "name color")
      .populate("business", "name")
      .populate("branch", "name");

    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching tag analytics by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete a record
export const deleteTagAnalytics = async (req, res) => {
  try {
    const deleted = await TagAnalytics.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Record not found" });

    res.status(200).json({ success: true, message: "Tag analytics deleted" });
  } catch (error) {
    console.error("Error deleting tag analytics:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
