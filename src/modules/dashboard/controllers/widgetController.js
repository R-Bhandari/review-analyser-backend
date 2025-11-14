import Widget from "../models/widgetModel.js";

// Create widget
export const createWidget = async (req, res) => {
  try {
    const exists = await Widget.findOne({ key: req.body.key });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Widget key already exists",
      });
    }

    const widget = await Widget.create(req.body);

    res.status(201).json({
      success: true,
      message: "Widget created successfully",
      data: widget,
    });
  } catch (error) {
    console.error("Error creating widget:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all widgets
export const getAllWidgets = async (req, res) => {
  try {
    const widgets = await Widget.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: widgets });
  } catch (error) {
    console.error("Error fetching widgets:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get widget by key
export const getWidgetByKey = async (req, res) => {
  try {
    const widget = await Widget.findOne({ key: req.params.key });

    if (!widget) {
      return res.status(404).json({
        success: false,
        message: "Widget not found",
      });
    }

    res.status(200).json({ success: true, data: widget });
  } catch (error) {
    console.error("Error getting widget:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete widget
export const deleteWidget = async (req, res) => {
  try {
    const removed = await Widget.findOneAndDelete({ key: req.params.key });

    if (!removed) {
      return res.status(404).json({
        success: false,
        message: "Widget not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Widget deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting widget:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
