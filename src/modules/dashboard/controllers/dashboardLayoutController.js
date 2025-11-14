import DashboardLayout from "../models/dashboardLayoutModel.js";

// Create layout
export const createDashboardLayout = async (req, res) => {
  try {
    const exists = await DashboardLayout.findOne({ key: req.body.key });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Dashboard key already exists"
      });
    }

    const layout = await DashboardLayout.create(req.body);

    res.status(201).json({
      success: true,
      message: "Dashboard layout created successfully",
      data: layout
    });
  } catch (error) {
    console.error("Error creating dashboard layout:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get layout by key
export const getDashboardByKey = async (req, res) => {
  try {
    const layout = await DashboardLayout.findOne({ key: req.params.key })
      .populate("widgets.widgetId");

    if (!layout) {
      return res.status(404).json({
        success: false,
        message: "Dashboard layout not found"
      });
    }

    res.status(200).json({ success: true, data: layout });
  } catch (error) {
    console.error("Error fetching dashboard layout:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update layout (drag-drop)
export const updateDashboardLayout = async (req, res) => {
  try {
    const updated = await DashboardLayout.findOneAndUpdate(
      { key: req.params.key },
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Dashboard layout updated",
      data: updated
    });
  } catch (error) {
    console.error("Error updating dashboard layout:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete layout
export const deleteDashboardLayout = async (req, res) => {
  try {
    const removed = await DashboardLayout.findOneAndDelete({
      key: req.params.key
    });

    res.status(200).json({
      success: true,
      message: "Dashboard layout deleted"
    });
  } catch (error) {
    console.error("Error deleting dashboard layout:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
