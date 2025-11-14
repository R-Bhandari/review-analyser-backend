import Referral from "../models/referralModel.js";
import { nanoid } from "nanoid";

// ➤ Create Referral
export const createReferral = async (req, res) => {
  try {
    const referralCode = "REF-" + nanoid(8).toUpperCase();

    const referral = await Referral.create({
      ...req.body,
      referralCode
    });

    res.status(201).json({
      success: true,
      message: "Referral created successfully",
      data: referral
    });
  } catch (error) {
    console.error("Error creating referral:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// ➤ Get All Referrals
export const getAllReferrals = async (req, res) => {
  try {
    const list = await Referral.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    console.error("Error fetching referrals:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ➤ Get Referral by ID
export const getReferralById = async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id);

    if (!referral)
      return res.status(404).json({
        success: false,
        message: "Referral not found"
      });

    res.status(200).json({ success: true, data: referral });
  } catch (error) {
    console.error("Error fetching referral:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Update Referral (used when referral completes)
export const updateReferral = async (req, res) => {
  try {
    const updated = await Referral.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Referral updated successfully",
      data: updated
    });
  } catch (error) {
    console.error("Error updating referral:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Referral
export const deleteReferral = async (req, res) => {
  try {
    const deleted = await Referral.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({
        success: false,
        message: "Referral not found"
      });

    res.status(200).json({
      success: true,
      message: "Referral deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting referral:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
