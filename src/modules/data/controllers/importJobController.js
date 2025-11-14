import ImportJob from "../models/importJobModel.js";

// Create a new import job
export const createImportJob = async (req, res) => {
  try {
    const job = await ImportJob.create(req.body);

    res.status(201).json({
      success: true,
      message: "Import job created",
      data: job
    });
  } catch (error) {
    console.error("Error creating import job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all jobs (admin or business-level)
export const getAllImportJobs = async (req, res) => {
  try {
    const jobs = await ImportJob.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching import jobs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get jobs for specific business
export const getBusinessImportJobs = async (req, res) => {
  try {
    const jobs = await ImportJob.find({ businessId: req.params.businessId }).sort({
      createdAt: -1
    });

    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching business jobs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single job
export const getImportJobById = async (req, res) => {
  try {
    const job = await ImportJob.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error("Error fetching import job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update job (progress update)
export const updateImportJob = async (req, res) => {
  try {
    const updated = await ImportJob.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: "Import job updated",
      data: updated
    });
  } catch (error) {
    console.error("Error updating import job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete job
export const deleteImportJob = async (req, res) => {
  try {
    await ImportJob.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Import job deleted"
    });
  } catch (error) {
    console.error("Error deleting import job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
