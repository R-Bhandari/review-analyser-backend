import RewardRedemption from "../models/rewardRedemptionModel.js";
import { nanoid } from "nanoid";

// ➤ Create Redemption
export const createRedemption = async (req, res) => {
  try {
    const redemptionCode = "REDEEM-" + nanoid(10).toUpperCase();

    const redemption = await RewardRedemption.create({
      ...req.body,
      redemptionCode
    });

    res.status(201).json({
      success: true,
      message: "Reward redemption initiated",
      data: redemption
    });
  } catch (error) {
    console.error("Error creating redemption:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get all redemptions
export const getAllRedemptions = async (req, res) => {
  try {
    const list = await RewardRedemption.find()
      .populate("customerId voucherId businessOwnerId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching redemptions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get redemption by ID
export const getRedemptionById = async (req, res) => {
  try {
    const redemption = await RewardRedemption.findById(req.params.id)
      .populate("customerId voucherId businessOwnerId");

    if (!redemption)
      return res.status(404).json({ success: false, message: "Redemption not found" });

    res.status(200).json({ success: true, data: redemption });
  } catch (error) {
    console.error("Error fetching redemption:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Update status (approve / reject / complete)
export const updateRedemption = async (req, res) => {
  try {
    if (req.body.status === "completed") {
      req.body.redeemedAt = Date.now();
    }

    const updated = await RewardRedemption.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Redemption updated successfully",
      data: updated
    });
  } catch (error) {
    console.error("Error updating redemption:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Delete redemption
export const deleteRedemption = async (req, res) => {
  try {
    const deleted = await RewardRedemption.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ success: false, message: "Redemption not found" });

    res.status(200).json({
      success: true,
      message: "Redemption deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting redemption:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
