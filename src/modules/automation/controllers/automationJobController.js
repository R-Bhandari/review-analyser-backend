import AutomationJob from "../models/automationJobModel.js";

// ➤ Create or Register New Job
export const createAutomationJob = async (req, res) => {
  try {
    const existing = await AutomationJob.findOne({ jobName: req.body.jobName });
    if (existing)
      return res.status(400).json({ success: false, message: "Job name already exists" });

    const job = await AutomationJob.create(req.body);
    res.status(201).json({ success: true, message: "Automation job created", data: job });
  } catch (error) {
    console.error("Error creating automation job:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get All Jobs
export const getAllAutomationJobs = async (req, res) => {
  try {
    const jobs = await AutomationJob.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching automation jobs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get Single Job by ID
export const getAutomationJobById = async (req, res) => {
  try {
    const job = await AutomationJob.findById(req.params.id);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Update Job (e.g., schedule change, manual retry)
export const updateAutomationJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await AutomationJob.findByIdAndUpdate(id, req.body, { new: true });

    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    res.status(200).json({ success: true, message: "Automation job updated", data: job });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Job
export const deleteAutomationJob = async (req, res) => {
  try {
    const deleted = await AutomationJob.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Job not found" });

    res.status(200).json({ success: true, message: "Automation job deleted" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Simulate Job Run (for testing automation behavior)
export const simulateJobRun = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await AutomationJob.findById(id);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    // Simulate execution
    const startTime = Date.now();
    job.status = "running";
    await job.save();

    // Simulated delay and result
    await new Promise((resolve) => setTimeout(resolve, 1000));
    job.status = "success";
    job.lastRunAt = new Date();
    job.lastDurationMs = Date.now() - startTime;
    job.runCount += 1;
    job.resultSummary = `Job executed successfully at ${job.lastRunAt.toISOString()}`;
    job.nextRunAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // +1 day

    await job.save();

    res.status(200).json({ success: true, message: "Job executed (simulated)", data: job });
  } catch (error) {
    console.error("Error simulating job run:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
