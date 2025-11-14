import ExportJob from "../models/exportJobModel.js";

/* Create export job */
export const createExportJob = async (req, res) => {
  try {
    const job = await ExportJob.create(req.body);
    // Optionally enqueue background worker here (Bull/Agenda/etc)
    res.status(201).json({ success: true, message: "Export job created", data: job });
  } catch (error) {
    console.error("Error creating export job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Get all export jobs */
export const getAllExportJobs = async (req, res) => {
  try {
    const jobs = await ExportJob.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching export jobs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Get jobs for a business */
export const getBusinessExportJobs = async (req, res) => {
  try {
    const jobs = await ExportJob.find({ businessId: req.params.businessId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching business export jobs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Get single job */
export const getExportJobById = async (req, res) => {
  try {
    const job = await ExportJob.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error("Error fetching export job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Update job progress or final result */
export const updateExportJob = async (req, res) => {
  try {
    const updated = await ExportJob.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Export job updated", data: updated });
  } catch (error) {
    console.error("Error updating export job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* Delete job */
export const deleteExportJob = async (req, res) => {
  try {
    await ExportJob.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Export job deleted" });
  } catch (error) {
    console.error("Error deleting export job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
