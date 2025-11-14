import WidgetFilter from "../models/widgetFilterModel.js";

// Create / Save widget filter
export const saveWidgetFilter = async (req, res) => {
  try {
    const { widgetId, dashboardKey, userId, filters } = req.body;

    const existing = await WidgetFilter.findOne({
      widgetId,
      dashboardKey,
      userId
    });

    let result;

    if (existing) {
      existing.filters = filters;
      result = await existing.save();
    } else {
      result = await WidgetFilter.create(req.body);
    }

    res.status(200).json({
      success: true,
      message: "Widget filter saved",
      data: result
    });
  } catch (error) {
    console.error("Error saving widget filter:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get filter for a specific widget
export const getWidgetFilter = async (req, res) => {
  try {
    const { widgetId, dashboardKey, userId } = req.query;

    const filter = await WidgetFilter.findOne({
      widgetId,
      dashboardKey,
      userId
    });

    res.status(200).json({ success: true, data: filter || {} });
  } catch (error) {
    console.error("Error getting widget filter:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete widget filter
export const deleteWidgetFilter = async (req, res) => {
  try {
    await WidgetFilter.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Widget filter deleted"
    });
  } catch (error) {
    console.error("Error deleting widget filter:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
