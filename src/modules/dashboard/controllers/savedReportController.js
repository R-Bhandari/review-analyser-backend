import SavedReport from "../models/savedReportModel.js";

// Create new saved report
export const createSavedReport = async (req, res) => {
  try {
    const report = await SavedReport.create(req.body);

    res.status(201).json({
      success: true,
      message: "Report saved successfully",
      data: report
    });
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all saved reports
export const getAllSavedReports = async (req, res) => {
  try {
    const list = await SavedReport.find()
      .populate("templateId")
      .populate("userId");

    res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get reports for a business
export const getBusinessReports = async (req, res) => {
  try {
    const list = await SavedReport.find({ businessId: req.params.businessId })
      .populate("templateId")
      .populate("userId");

    res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    console.error("Error fetching business reports:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single report
export const getSavedReportById = async (req, res) => {
  try {
    const report = await SavedReport.findById(req.params.id)
      .populate("templateId")
      .populate("userId");

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete saved report
export const deleteSavedReport = async (req, res) => {
  try {
    await SavedReport.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Saved report deleted"
    });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
