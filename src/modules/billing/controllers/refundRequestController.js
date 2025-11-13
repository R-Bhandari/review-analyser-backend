import RefundRequest from "../models/refundRequestModel.js";

// ➤ Create Refund Request
export const createRefundRequest = async (req, res) => {
  try {
    const refund = await RefundRequest.create(req.body);

    res.status(201).json({
      success: true,
      message: "Refund request submitted successfully",
      data: refund,
    });
  } catch (error) {
    console.error("Error creating refund request:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ➤ Get all refund requests
export const getAllRefundRequests = async (req, res) => {
  try {
    const list = await RefundRequest.find()
      .populate("invoiceId")
      .populate("transactionId")
      .populate("subscriptionId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching refund requests:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get Refund Request by ID
export const getRefundRequestById = async (req, res) => {
  try {
    const refund = await RefundRequest.findById(req.params.id)
      .populate("invoiceId")
      .populate("transactionId")
      .populate("subscriptionId");

    if (!refund)
      return res.status(404).json({ success: false, message: "Refund request not found" });

    res.status(200).json({ success: true, data: refund });
  } catch (error) {
    console.error("Error fetching refund request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Update Refund Request (approve/reject/process)
export const updateRefundRequest = async (req, res) => {
  try {
    const updated = await RefundRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Refund request updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating refund request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Refund Request
export const deleteRefundRequest = async (req, res) => {
  try {
    const deleted = await RefundRequest.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Refund request not found" });

    res.status(200).json({ success: true, message: "Refund request deleted successfully" });
  } catch (error) {
    console.error("Error deleting refund request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
