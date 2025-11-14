import mongoose from "mongoose";

const exportJobSchema = new mongoose.Schema(
  {
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    exportType: {
      type: String,
      required: true,
      enum: ["feedback", "users", "branches", "invoices", "reports", "custom"]
    },

    format: {
      type: String,
      enum: ["csv", "excel", "pdf", "json"],
      default: "csv"
    },

    filters: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending"
    },

    totalRecords: { type: Number, default: 0 },
    processedRecords: { type: Number, default: 0 },

    fileUrl: { type: String, default: null }, // S3 / storage URL
    fileName: { type: String, default: null },

    errorMessage: { type: String, default: null },
    startedAt: { type: Date },
    completedAt: { type: Date },

    // optional: store job metadata like queue id, worker id
    meta: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

exportJobSchema.index({ businessId: 1, status: 1 });
exportJobSchema.index({ userId: 1, createdAt: -1 });

const ExportJob = mongoose.model("ExportJob", exportJobSchema);
export default ExportJob;
