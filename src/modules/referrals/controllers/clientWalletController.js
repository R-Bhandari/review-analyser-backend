import ClientWallet from "../models/clientWalletModel.js";

// ➤ Create Wallet
export const createClientWallet = async (req, res) => {
  try {
    const exists = await ClientWallet.findOne({ businessId: req.body.businessId });
    if (exists)
      return res.status(400).json({ success: false, message: "Wallet already exists for business" });

    const wallet = await ClientWallet.create(req.body);

    res.status(201).json({
      success: true,
      message: "Client wallet created successfully",
      data: wallet
    });
  } catch (error) {
    console.error("Error creating client wallet:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get Wallet by Business
export const getWalletByBusiness = async (req, res) => {
  try {
    const wallet = await ClientWallet.findOne({ businessId: req.params.businessId });

    if (!wallet)
      return res.status(404).json({ success: false, message: "Client wallet not found" });

    res.status(200).json({ success: true, data: wallet });
  } catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Update Wallet
export const updateClientWallet = async (req, res) => {
  try {
    req.body.lastUpdated = Date.now();

    const updated = await ClientWallet.findOneAndUpdate(
      { businessId: req.params.businessId },
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Client wallet updated",
      data: updated
    });
  } catch (error) {
    console.error("Error updating wallet:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Delete Wallet
export const deleteClientWallet = async (req, res) => {
  try {
    const deleted = await ClientWallet.findOneAndDelete({ businessId: req.params.businessId });

    if (!deleted)
      return res.status(404).json({ success: false, message: "Wallet not found" });

    res.status(200).json({
      success: true,
      message: "Client wallet deleted"
    });
  } catch (error) {
    console.error("Error deleting wallet:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
