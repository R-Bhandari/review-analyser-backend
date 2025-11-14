import WidgetDataCache from "../models/widgetDataCacheModel.js";

// Save or update cache
export const saveCache = async (req, res) => {
  try {
    const { widgetId, businessId, dashboardKey, filtersHash, cachedData } = req.body;

    let existing = await WidgetDataCache.findOne({
      widgetId,
      businessId,
      dashboardKey,
      filtersHash
    });

    if (existing) {
      existing.cachedData = cachedData;
      existing.lastComputedAt = new Date();
      existing.isExpired = false;

      await existing.save();
      return res.status(200).json({ success: true, message: "Cache updated", data: existing });
    }

    const created = await WidgetDataCache.create(req.body);

    res.status(201).json({
      success: true,
      message: "Cache created",
      data: created
    });
  } catch (error) {
    console.error("Error saving cache:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get cache
export const getCache = async (req, res) => {
  try {
    const { widgetId, businessId, dashboardKey, filtersHash } = req.query;

    const cache = await WidgetDataCache.findOne({
      widgetId,
      businessId,
      dashboardKey,
      filtersHash
    });

    res.status(200).json({ success: true, data: cache });
  } catch (error) {
    console.error("Error fetching cache:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark cache as expired
export const expireCache = async (req, res) => {
  try {
    const cache = await WidgetDataCache.findByIdAndUpdate(
      req.params.id,
      { isExpired: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cache marked as expired",
      data: cache
    });
  } catch (error) {
    console.error("Error expiring cache:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete cache
export const deleteCache = async (req, res) => {
  try {
    await WidgetDataCache.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Cache deleted"
    });
  } catch (error) {
    console.error("Error deleting cache:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
