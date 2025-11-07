import AnalyticsCache from "../models/analyticsCacheModel.js";

// ➤ Create or Update Cache Entry
export const upsertAnalyticsCache = async (req, res) => {
  try {
    const { business, branch, cacheType, periodStart, periodEnd } = req.body;

    let cache = await AnalyticsCache.findOne({ business, branch, cacheType, periodStart });
    if (cache) {
      cache = await AnalyticsCache.findByIdAndUpdate(cache._id, req.body, { new: true });
      return res.status(200).json({ success: true, message: "Cache updated", data: cache });
    }

    const newCache = await AnalyticsCache.create(req.body);
    res.status(201).json({ success: true, message: "Cache created", data: newCache });
  } catch (error) {
    console.error("Error creating/updating cache:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get Cached Data
export const getAnalyticsCache = async (req, res) => {
  try {
    const { businessId, branchId, cacheType, periodType } = req.query;
    const filter = {};
    if (businessId) filter.business = businessId;
    if (branchId) filter.branch = branchId;
    if (cacheType) filter.cacheType = cacheType;
    if (periodType) filter.periodType = periodType;

    const caches = await AnalyticsCache.find(filter)
      .populate("business", "name")
      .populate("branch", "name")
      .sort({ periodStart: -1 });

    res.status(200).json({ success: true, data: caches });
  } catch (error) {
    console.error("Error fetching cache:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get Cache by ID
export const getAnalyticsCacheById = async (req, res) => {
  try {
    const cache = await AnalyticsCache.findById(req.params.id)
      .populate("business", "name")
      .populate("branch", "name");

    if (!cache)
      return res.status(404).json({ success: false, message: "Cache not found" });

    res.status(200).json({ success: true, data: cache });
  } catch (error) {
    console.error("Error fetching cache by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Cache
export const deleteAnalyticsCache = async (req, res) => {
  try {
    const deleted = await AnalyticsCache.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Cache not found" });

    res.status(200).json({ success: true, message: "Cache deleted" });
  } catch (error) {
    console.error("Error deleting cache:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
