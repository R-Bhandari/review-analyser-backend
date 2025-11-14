import ReferralEarning from "../models/referralEarningModel.js";
import Referral from "../models/referralModel.js";

// ➤ Create a referral earning (internal use after referral success)
export const createReferralEarning = async (req, res) => {
  try {
    const earning = await ReferralEarning.create(req.body);

    res.status(201).json({
      success: true,
      message: "Referral earning created successfully",
      data: earning
    });
  } catch (error) {
    console.error("Error creating referral earning:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// ➤ Get all earnings
export const getAllReferralEarnings = async (req, res) => {
  try {
    const list = await ReferralEarning.find()
      .populate("referralId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    console.error("Error fetching earnings:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ➤ Get single earning
export const getReferralEarningById = async (req, res) => {
  try {
    const earning = await ReferralEarning.findById(req.params.id)
      .populate("referralId");

    if (!earning)
      return res.status(404).json({
        success: false,
        message: "Referral earning not found"
      });

    res.status(200).json({ success: true, data: earning });
  } catch (error) {
    console.error("Error fetching earning:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ➤ Update earning status
export const updateReferralEarning = async (req, res) => {
  try {
    const updated = await ReferralEarning.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Referral earning updated",
      data: updated
    });
  } catch (error) {
    console.error("Error updating earning:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ➤ Delete earning
export const deleteReferralEarning = async (req, res) => {
  try {
    const deleted = await ReferralEarning.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({
        success: false,
        message: "Referral earning not found"
      });

    res.status(200).json({
      success: true,
      message: "Referral earning deleted"
    });
  } catch (error) {
    console.error("Error deleting earning:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
