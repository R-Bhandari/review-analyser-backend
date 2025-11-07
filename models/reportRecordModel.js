import mongoose from "mongoose";

const reportRecordSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: false,
      index: true,
    },

    // Report info
    reportName: { type: String, required: true, trim: true },
    reportType: {
      type: String,
      enum: ["daily", "weekly", "monthly", "custom"],
      default: "daily",
    },
    category: {
      type: String,
      enum: ["analytics", "ai-summary", "trend", "feedback", "custom"],
      default: "analytics",
    },
    description: { type: String },

    // Generated content & links
    fileUrl: { type: String }, // link to downloadable file
    fileType: { type: String, enum: ["pdf", "excel", "json", "csv"], default: "pdf" },
    dataSnapshot: { type: mongoose.Schema.Types.Mixed }, // store data used for report
    generatedTextSummary: { type: String }, // AI-generated summary inside report

    // Job linkage
    automationJobRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AutomationJob",
    },

    // Generation status
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    generatedAt: { type: Date, default: Date.now },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    errorMessage: { type: String },

    // Optional retention info
    expiresAt: { type: Date }, // optional TTL for old reports
  },
  { timestamps: true }
);

// TTL index for automatic expiry (if expiresAt is set)
reportRecordSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
reportRecordSchema.index({ business: 1, reportType: 1 });

const ReportRecord = mongoose.model("ReportRecord", reportRecordSchema);
export default ReportRecord;
