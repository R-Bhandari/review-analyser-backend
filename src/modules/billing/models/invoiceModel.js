// modules/billing/models/invoiceModel.js

import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    billingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Billing",
      required: [true, "Billing ID is required"],
    },

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    issueDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    amount: {
      type: Number,
      required: [true, "Invoice amount is required"],
    },

    discount: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    totalPayable: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["paid", "unpaid", "pending", "overdue", "cancelled"],
      default: "unpaid",
    },

    pdfUrl: {
      type: String,
      required: false,
    },

    notes: {
      type: String,
      required: false,
      trim: true,
    }
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
