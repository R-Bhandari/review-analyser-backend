import Plan from "../models/planModel.js";

// ➤ Create Plan
export const createPlan = async (req, res) => {
  try {
    const existing = await Plan.findOne({ name: req.body.name });
    if (existing)
      return res.status(400).json({ success: false, message: "Plan name already exists" });

    const plan = await Plan.create(req.body);

    res.status(201).json({
      success: true,
      message: "Plan created successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get All Plans
export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ price: 1 });
    res.status(200).json({ success: true, data: plans });
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get Plan by ID
export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan)
      return res.status(404).json({ success: false, message: "Plan not found" });

    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    console.error("Error fetching plan:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Update Plan
export const updatePlan = async (req, res) => {
  try {
    const updated = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Plan
export const deletePlan = async (req, res) => {
  try {
    const deleted = await Plan.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Plan not found" });

    res.status(200).json({ success: true, message: "Plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
