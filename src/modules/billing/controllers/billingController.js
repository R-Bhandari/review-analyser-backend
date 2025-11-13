import Billing from "../models/billingModel.js";

// ➤ Create Billing Cycle
export const createBilling = async (req, res) => {
  try {
    const billing = await Billing.create(req.body);

    res.status(201).json({
      success: true,
      message: "Billing record created successfully",
      data: billing,
    });
  } catch (error) {
    console.error("Error creating billing record:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all billing records
export const getAllBilling = async (req, res) => {
  try {
    const list = await Billing.find()
      .populate("subscriptionId")
      .populate("planId")
      .populate("invoiceId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching billing records:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get billing by ID
export const getBillingById = async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id)
      .populate("subscriptionId")
      .populate("planId")
      .populate("invoiceId");

    if (!billing)
      return res.status(404).json({ success: false, message: "Billing record not found" });

    res.status(200).json({ success: true, data: billing });
  } catch (error) {
    console.error("Error fetching billing record:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Update Billing
export const updateBilling = async (req, res) => {
  try {
    const updated = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      success: true,
      message: "Billing record updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating billing:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Billing
export const deleteBilling = async (req, res) => {
  try {
    const deleted = await Billing.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Billing record not found" });

    res.status(200).json({ success: true, message: "Billing record deleted successfully" });
  } catch (error) {
    console.error("Error deleting billing:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
