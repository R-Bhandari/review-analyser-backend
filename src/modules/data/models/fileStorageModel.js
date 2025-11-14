import mongoose from "mongoose";

const fileStorageSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: false
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },

    fileName: {
      type: String,
      required: true
    },

    fileType: {
      type: String,
      enum: ["image", "pdf", "csv", "excel", "zip", "json", "backup", "other"],
      default: "other"
    },

    mimeType: {
      type: String,
      required: true
    },

    fileUrl: {
      type: String,
      required: true // S3/local bucket URL
    },

    sizeInBytes: {
      type: Number,
      default: 0
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },

    category: {
      type: String,
      enum: [
        "logo",
        "profile",
        "report",
        "qrCode",
        "import",
        "export",
        "backup",
        "document",
        "other"
      ],
      default: "other"
    },

    status: {
      type: String,
      enum: ["active", "archived", "deleted"],
      default: "active"
    },

    storageProvider: {
      type: String,
      enum: ["local", "aws", "gcp", "azure"],
      default: "aws"
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true }
);

fileStorageSchema.index({ businessId: 1 });
fileStorageSchema.index({ category: 1 });
fileStorageSchema.index({ status: 1 });

const FileStorage = mongoose.model("FileStorage", fileStorageSchema);
export default FileStorage;
