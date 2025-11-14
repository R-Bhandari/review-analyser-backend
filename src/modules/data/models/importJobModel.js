import mongoose from "mongoose";

const importJobSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    importType: {
      type: String,
      required: true,
      enum: [
        "branch",
        "user",
        "feedback",
        "question",
        "tag",
        "menuItem",
        "product",
        "custom"
      ]
    },

    fileUrl: {
      type: String,
      required: true // location of CSV/Excel uploaded
    },

    fileType: {
      type: String,
      enum: ["csv", "excel"],
      required: true
    },

    totalRows: {
      type: Number,
      default: 0
    },

    processedRows: {
      type: Number,
      default: 0
    },

    failedRows: {
      type: Number,
      default: 0
    },

    failedRecords: {
      type: Array,
      default: []
      /*
        [
          { rowNumber: 5, error: "Invalid email", rowData: {...} },
          { rowNumber: 7, error: "Branch code missing", rowData: {...} }
        ]
      */
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending"
    },

    logs: {
      type: Array,
      default: []
      /*
        [
          "File uploaded successfully",
          "Started processing at 12:00 PM",
          "Branch ABC created",
          "5 records failed"
        ]
      */
    },

    startedAt: {
      type: Date
    },

    completedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

importJobSchema.index({ businessId: 1 });
importJobSchema.index({ userId: 1 });
importJobSchema.index({ status: 1 });

const ImportJob = mongoose.model("ImportJob", importJobSchema);
export default ImportJob;
