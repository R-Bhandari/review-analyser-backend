import RewardVoucher from "../models/rewardVoucherModel.js";

// ➤ Create Voucher
export const createVoucher = async (req, res) => {
  try {
    const voucher = await RewardVoucher.create(req.body);

    res.status(201).json({
      success: true,
      message: "Voucher created successfully",
      data: voucher
    });
  } catch (error) {
    console.error("Error creating voucher:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get all vouchers
export const getAllVouchers = async (req, res) => {
  try {
    const list = await RewardVoucher.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get voucher by ID
export const getVoucherById = async (req, res) => {
  try {
    const voucher = await RewardVoucher.findById(req.params.id);

    if (!voucher)
      return res.status(404).json({
        success: false,
        message: "Voucher not found"
      });

    res.status(200).json({ success: true, data: voucher });
  } catch (error) {
    console.error("Error fetching voucher:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Update voucher
export const updateVoucher = async (req, res) => {
  try {
    const updated = await RewardVoucher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Voucher updated successfully",
      data: updated
    });
  } catch (error) {
    console.error("Error updating voucher:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Delete voucher
export const deleteVoucher = async (req, res) => {
  try {
    const deleted = await RewardVoucher.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({
        success: false,
        message: "Voucher not found"
      });

    res.status(200).json({
      success: true,
      message: "Voucher deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting voucher:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
