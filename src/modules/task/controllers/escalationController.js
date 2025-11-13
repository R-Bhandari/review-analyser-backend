import Escalation from "../models/escalationModel.js";

// ➤ Create Escalation Rule
export const createEscalation = async (req, res) => {
  try {
    const rule = await Escalation.create(req.body);

    res.status(201).json({
      success: true,
      message: "Escalation rule created successfully",
      data: rule,
    });
  } catch (error) {
    console.error("Error creating escalation rule:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all escalation rules for a task
export const getEscalationsByTask = async (req, res) => {
  try {
    const rules = await Escalation.find({ taskId: req.params.taskId }).sort({ level: 1 });
    res.status(200).json({ success: true, data: rules });
  } catch (error) {
    console.error("Error fetching escalation rules:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Update Escalation Rule
export const updateEscalation = async (req, res) => {
  try {
    const updated = await Escalation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: "Escalation rule updated",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating rule:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Escalation Rule
export const deleteEscalation = async (req, res) => {
  try {
    const deleted = await Escalation.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Escalation rule not found" });

    res.status(200).json({ success: true, message: "Escalation rule deleted successfully" });
  } catch (error) {
    console.error("Error deleting rule:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
