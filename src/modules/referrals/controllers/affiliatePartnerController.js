import AffiliatePartner from "../models/affiliatePartnerModel.js";
import { nanoid } from "nanoid";

// ➤ Create Affiliate Partner
export const createAffiliatePartner = async (req, res) => {
  try {
    const referralCode = "AFF-" + nanoid(6).toUpperCase();

    const partner = await AffiliatePartner.create({
      ...req.body,
      referralCode
    });

    res.status(201).json({
      success: true,
      message: "Affiliate partner created successfully",
      data: partner
    });
  } catch (error) {
    console.error("Error creating affiliate partner:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get all partners
export const getAllAffiliatePartners = async (req, res) => {
  try {
    const list = await AffiliatePartner.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching affiliate partners:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get partner by ID
export const getAffiliatePartnerById = async (req, res) => {
  try {
    const partner = await AffiliatePartner.findById(req.params.id);

    if (!partner)
      return res.status(404).json({ success: false, message: "Affiliate partner not found" });

    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    console.error("Error fetching partner:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Update partner
export const updateAffiliatePartner = async (req, res) => {
  try {
    const updated = await AffiliatePartner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Partner updated successfully",
      data: updated
    });
  } catch (error) {
    console.error("Error updating partner:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Delete partner
export const deleteAffiliatePartner = async (req, res) => {
  try {
    const deleted = await AffiliatePartner.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ success: false, message: "Affiliate partner not found" });

    res.status(200).json({ success: true, message: "Affiliate partner deleted" });
  } catch (error) {
    console.error("Error deleting partner:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
