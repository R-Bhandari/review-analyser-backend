import ReportTemplate from "../models/reportTemplateModel.js";

// Create template
export const createReportTemplate = async (req, res) => {
  try {
    const exists = await ReportTemplate.findOne({ key: req.body.key });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Template key already exists"
      });
    }

    const template = await ReportTemplate.create(req.body);

    res.status(201).json({
      success: true,
      message: "Report template created",
      data: template
    });
  } catch (error) {
    console.error("Error creating report template:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all templates
export const getAllReportTemplates = async (req, res) => {
  try {
    const list = await ReportTemplate.find()
      .populate("widgets.widgetId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get template by key
export const getReportTemplateByKey = async (req, res) => {
  try {
    const template = await ReportTemplate.findOne({ key: req.params.key })
      .populate("widgets.widgetId");

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    res.status(200).json({ success: true, data: template });
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update template
export const updateReportTemplate = async (req, res) => {
  try {
    const updated = await ReportTemplate.findOneAndUpdate(
      { key: req.params.key },
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Report template updated",
      data: updated
    });
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete template
export const deleteReportTemplate = async (req, res) => {
  try {
    await ReportTemplate.findOneAndDelete({ key: req.params.key });

    res.status(200).json({
      success: true,
      message: "Report template deleted"
    });
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
