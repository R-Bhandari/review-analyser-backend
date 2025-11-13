import PaymentTransaction from "../models/paymentTransactionModel.js";

// ➤ Create Transaction
export const createTransaction = async (req, res) => {
  try {
    const txn = await PaymentTransaction.create(req.body);

    res.status(201).json({
      success: true,
      message: "Payment transaction saved successfully",
      data: txn,
    });
  } catch (error) {
    console.error("Error creating payment transaction:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get All Transactions
export const getAllTransactions = async (req, res) => {
  try {
    const list = await PaymentTransaction.find()
      .populate("invoiceId")
      .populate("subscriptionId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get Transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const txn = await PaymentTransaction.findById(req.params.id)
      .populate("invoiceId")
      .populate("subscriptionId");

    if (!txn)
      return res.status(404).json({ success: false, message: "Transaction not found" });

    res.status(200).json({ success: true, data: txn });
  } catch (error) {
    console.error("Error fetching payment transaction:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Update Transaction
export const updateTransaction = async (req, res) => {
  try {
    const updated = await PaymentTransaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Transaction
export const deleteTransaction = async (req, res) => {
  try {
    const deleted = await PaymentTransaction.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Transaction not found" });

    res.status(200).json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
