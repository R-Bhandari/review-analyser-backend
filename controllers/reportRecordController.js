import ReportRecord from "../models/reportRecordModel.js";

// ➤ Create new report record (manual or automated)
export const createReportRecord = async (req, res) => {
  try {
    const report = await ReportRecord.create(req.body);
    res.status(201).json({ success: true, message: "Report record created", data: report });
  } catch (error) {
    console.error("Error creating report record:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all reports (filter by business, type, etc.)
export const getAllReports = async (req, res) => {
  try {
    const { businessId, reportType, category, status } = req.query;
    const filter = {};
    if (businessId) filter.business = businessId;
    if (reportType) filter.reportType = reportType;
    if (category) filter.category = category;
    if (status) filter.status = status;

    const reports = await ReportRecord.find(filter)
      .populate("business", "name")
      .populate("branch", "name")
      .populate("automationJobRef", "jobName status")
      .populate("generatedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get single report by ID
export const getReportById = async (req, res) => {
  try {
    const report = await ReportRecord.findById(req.params.id)
      .populate("business", "name")
      .populate("generatedBy", "name email");
    if (!report)
      return res.status(404).json({ success: false, message: "Report not found" });

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Update report status or metadata
export const updateReportRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ReportRecord.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated)
      return res.status(404).json({ success: false, message: "Report not found" });

    res.status(200).json({ success: true, message: "Report updated", data: updated });
  } catch (error) {
    console.error("Error updating report record:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete report
export const deleteReportRecord = async (req, res) => {
  try {
    const deleted = await ReportRecord.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Report not found" });

    res.status(200).json({ success: true, message: "Report deleted" });
  } catch (error) {
    console.error("Error deleting report record:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Simulate report generation (for test)
export const simulateReportGeneration = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await ReportRecord.findById(id);
    if (!report)
      return res.status(404).json({ success: false, message: "Report not found" });

    // Simulated generation
    report.status = "success";
    report.fileUrl = `https://example.com/reports/${report._id}.pdf`;
    report.generatedTextSummary = "Report successfully generated with latest analytics and AI insights.";
    report.generatedAt = new Date();
    await report.save();

    res.status(200).json({ success: true, message: "Report generated (simulated)", data: report });
  } catch (error) {
    console.error("Error simulating report generation:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
