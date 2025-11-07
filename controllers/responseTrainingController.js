import ResponseTraining from "../models/responseTrainingModel.js";

// ➤ Create new training record
export const createTrainingRecord = async (req, res) => {
  try {
    const record = await ResponseTraining.create(req.body);
    res.status(201).json({ success: true, message: "Training record created", data: record });
  } catch (error) {
    console.error("Error creating training record:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all records (with filters)
export const getAllTrainingRecords = async (req, res) => {
  try {
    const { businessId, taskType, isApproved, needsRetraining } = req.query;
    const filter = {};
    if (businessId) filter.business = businessId;
    if (taskType) filter.taskType = taskType;
    if (isApproved) filter.isApproved = isApproved === "true";
    if (needsRetraining) filter.needsRetraining = needsRetraining === "true";

    const records = await ResponseTraining.find(filter)
      .populate("business", "name")
      .populate("reviewedBy", "name email")
      .populate("aiRequestRef", "requestType")
      .populate("autoSummaryRef", "summaryType")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: records });
  } catch (error) {
    console.error("Error fetching training records:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get record by ID
export const getTrainingRecordById = async (req, res) => {
  try {
    const record = await ResponseTraining.findById(req.params.id)
      .populate("business", "name")
      .populate("reviewedBy", "name email");

    if (!record)
      return res.status(404).json({ success: false, message: "Record not found" });

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error("Error fetching training record:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Update record (for review/approval)
export const updateTrainingRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await ResponseTraining.findByIdAndUpdate(id, req.body, { new: true });

    if (!record)
      return res.status(404).json({ success: false, message: "Record not found" });

    res.status(200).json({ success: true, message: "Training record updated", data: record });
  } catch (error) {
    console.error("Error updating training record:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete record
export const deleteTrainingRecord = async (req, res) => {
  try {
    const deleted = await ResponseTraining.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Record not found" });

    res.status(200).json({ success: true, message: "Training record deleted" });
  } catch (error) {
    console.error("Error deleting training record:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
