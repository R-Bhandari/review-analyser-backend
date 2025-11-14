import mongoose from "mongoose";

const backupJobSchema = new mongoose.Schema(
  {
    triggeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false // system backups won't have a user
    },

    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: false // optional, for business-specific backups
    },

    backupType: {
      type: String,
      enum: ["database", "collection", "files", "full"],
      required: true
    },

    collectionName: {
      type: String,
      required: function () {
        return this.backupType === "collection";
      }
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending"
    },

    fileUrl: {
      type: String,
      default: null // S3 or local backup path
    },

    fileSizeMB: {
      type: Number,
      default: 0
    },

    logs: {
      type: Array,
      default: []
      /*
        Example:
        [
          "Backup job queued",
          "Dumping database...",
          "Upload to S3 completed"
        ]
      */
    },

    startedAt: { type: Date },
    completedAt: { type: Date },

    errorMessage: {
      type: String,
      default: null
    },

    scheduleInfo: {
      type: mongoose.Schema.Types.Mixed,
      default: null
      /*
        Example:
        {
          scheduleId: "cron_backup_001",
          frequency: "daily",
          nextRun: "2025-01-22T03:00:00Z"
        }
      */
    }
  },
  { timestamps: true }
);

backupJobSchema.index({ status: 1 });
backupJobSchema.index({ backupType: 1 });
backupJobSchema.index({ businessId: 1 });

const BackupJob = mongoose.model("BackupJob", backupJobSchema);
export default BackupJob;
