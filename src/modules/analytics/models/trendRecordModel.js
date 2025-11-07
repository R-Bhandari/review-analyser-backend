import mongoose from "mongoose";

const trendRecordSchema = new mongoose.Schema(
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

    // Period information
    periodType: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
    },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },

    // Metrics tracked
    totalFeedbacks: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    positivePercentage: { type: Number, default: 0 },
    neutralPercentage: { type: Number, default: 0 },
    negativePercentage: { type: Number, default: 0 },

    // Optional note for insights
    remark: { type: String },

    lastComputedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

trendRecordSchema.index({
  business: 1,
  branch: 1,
  periodType: 1,
  periodStart: 1,
});

const TrendRecord = mongoose.model("TrendRecord", trendRecordSchema);
export default TrendRecord;
