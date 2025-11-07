import mongoose from "mongoose";

const automationJobSchema = new mongoose.Schema(
  {
    jobName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    jobType: {
      type: String,
      enum: ["daily", "weekly", "monthly", "custom"],
      default: "daily",
    },
    description: { type: String },

    // Target entities
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: false,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: false,
    },

    // Execution details
    lastRunAt: { type: Date },
    nextRunAt: { type: Date },
    lastDurationMs: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "running", "success", "failed"],
      default: "pending",
    },
    runCount: { type: Number, default: 0 },
    failureCount: { type: Number, default: 0 },
    lastError: { type: String },

    // Result logs
    resultSummary: { type: String },
    log: { type: String },

    // Scheduling metadata
    isActive: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

// automationJobSchema.index({ jobName: 1 });

const AutomationJob = mongoose.model("AutomationJob", automationJobSchema);
export default AutomationJob;
