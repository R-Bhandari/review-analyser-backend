import CustomerWallet from "../models/customerWalletModel.js";

// ➤ Create Customer Wallet
export const createCustomerWallet = async (req, res) => {
  try {
    const exists = await CustomerWallet.findOne({ customerId: req.body.customerId });

    if (exists)
      return res.status(400).json({
        success: false,
        message: "Wallet already exists for this customer"
      });

    const wallet = await CustomerWallet.create(req.body);

    res.status(201).json({
      success: true,
      message: "Customer wallet created successfully",
      data: wallet
    });
  } catch (error) {
    console.error("Error creating wallet:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get Customer Wallet
export const getCustomerWallet = async (req, res) => {
  try {
    const wallet = await CustomerWallet.findOne({ customerId: req.params.customerId });

    if (!wallet)
      return res.status(404).json({
        success: false,
        message: "Wallet not found"
      });

    res.status(200).json({ success: true, data: wallet });
  } catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Update Wallet
export const updateCustomerWallet = async (req, res) => {
  try {
    req.body.lastUpdated = Date.now();

    const updated = await CustomerWallet.findOneAndUpdate(
      { customerId: req.params.customerId },
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Wallet updated successfully",
      data: updated
    });
  } catch (error) {
    console.error("Error updating wallet:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Delete Wallet
export const deleteCustomerWallet = async (req, res) => {
  try {
    const deleted = await CustomerWallet.findOneAndDelete({
      customerId: req.params.customerId
    });

    if (!deleted)
      return res.status(404).json({
        success: false,
        message: "Wallet not found"
      });

    res.status(200).json({
      success: true,
      message: "Wallet deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting wallet:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
