import Invoice from "../models/invoiceModel.js";

// Utility: Generate invoice number
const generateInvoiceNumber = async () => {
  const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });

  if (!lastInvoice) return "INV-0001";

  const lastNumber = parseInt(lastInvoice.invoiceNumber.split("-")[1]);
  const newNumber = (lastNumber + 1).toString().padStart(4, "0");

  return `INV-${newNumber}`;
};

// ➤ Create Invoice
export const createInvoice = async (req, res) => {
  try {
    const invoiceNumber = await generateInvoiceNumber();

    const invoice = await Invoice.create({
      ...req.body,
      invoiceNumber,
    });

    res.status(201).json({
      success: true,
      message: "Invoice generated successfully",
      data: invoice,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all invoices
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("billingId")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get invoice by ID
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("billingId");

    if (!invoice)
      return res.status(404).json({ success: false, message: "Invoice not found" });

    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Update Invoice
export const updateInvoice = async (req, res) => {
  try {
    const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Invoice
export const deleteInvoice = async (req, res) => {
  try {
    const deleted = await Invoice.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Invoice not found" });

    res.status(200).json({ success: true, message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
