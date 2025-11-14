import BackupJob from "../models/backupJobModel.js";

// Create backup job
export const createBackupJob = async (req, res) => {
  try {
    const job = await BackupJob.create(req.body);

    res.status(201).json({
      success: true,
      message: "Backup job created",
      data: job
    });
  } catch (error) {
    console.error("Error creating backup job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all backup jobs
export const getAllBackupJobs = async (req, res) => {
  try {
    const jobs = await BackupJob.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching backup jobs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get backups for business
export const getBusinessBackupJobs = async (req, res) => {
  try {
    const jobs = await BackupJob.find({ businessId: req.params.businessId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching business backups:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single backup job
export const getBackupJobById = async (req, res) => {
  try {
    const job = await BackupJob.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Backup job not found" });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error("Error fetching backup job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update progress or result of backup
export const updateBackupJob = async (req, res) => {
  try {
    const updated = await BackupJob.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: "Backup job updated",
      data: updated
    });
  } catch (error) {
    console.error("Error updating backup job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete backup job
export const deleteBackupJob = async (req, res) => {
  try {
    await BackupJob.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Backup job deleted"
    });
  } catch (error) {
    console.error("Error deleting backup job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
