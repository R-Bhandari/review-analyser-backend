import ThemeSetting from "../models/themeSettingModel.js";

// Create or update theme
export const saveThemeSetting = async (req, res) => {
  try {
    const { businessId, userId } = req.body;

    const query = {};
    if (businessId) query.businessId = businessId;
    if (userId) query.userId = userId;

    let existing = await ThemeSetting.findOne(query);
    let result;

    if (existing) {
      Object.assign(existing, req.body);
      result = await existing.save();
    } else {
      result = await ThemeSetting.create(req.body);
    }

    res.status(200).json({
      success: true,
      message: "Theme saved successfully",
      data: result
    });
  } catch (error) {
    console.error("Error saving theme:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch theme for business or user
export const getThemeSetting = async (req, res) => {
  try {
    const { businessId, userId } = req.query;

    const query = {};
    if (businessId) query.businessId = businessId;
    if (userId) query.userId = userId;

    const theme = await ThemeSetting.findOne(query);

    res.status(200).json({
      success: true,
      data: theme
    });
  } catch (error) {
    console.error("Error fetching theme:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete theme
export const deleteThemeSetting = async (req, res) => {
  try {
    await ThemeSetting.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Theme deleted"
    });
  } catch (error) {
    console.error("Error deleting theme:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
