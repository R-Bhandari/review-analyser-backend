import WalletTransaction from "../models/walletTransactionModel.js";

// ➤ Create transaction entry
export const createTransaction = async (req, res) => {
  try {
    const tx = await WalletTransaction.create(req.body);

    res.status(201).json({
      success: true,
      message: "Transaction recorded successfully",
      data: tx
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get all transactions for a wallet
export const getTransactionsByWallet = async (req, res) => {
  try {
    const list = await WalletTransaction.find({
      walletId: req.params.walletId
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get a single transaction
export const getTransactionById = async (req, res) => {
  try {
    const tx = await WalletTransaction.findById(req.params.id);

    if (!tx)
      return res.status(404).json({
        success: false,
        message: "Transaction not found"
      });

    res.status(200).json({ success: true, data: tx });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Delete transaction (admin-only)
export const deleteTransaction = async (req, res) => {
  try {
    const deleted = await WalletTransaction.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({
        success: false,
        message: "Transaction not found"
      });

    res.status(200).json({
      success: true,
      message: "Transaction deleted"
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
