import mongoose from "mongoose";

const widgetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    key: {
      type: String,
      required: true,
      unique: true,
      trim: true, // e.g., "totalFeedback", "sentimentPie", "monthlyTrend"
    },

    type: {
      type: String,
      enum: [
        "counter",
        "line",
        "bar",
        "pie",
        "doughnut",
        "table",
        "card",
        "heatmap",
        "npsGauge",
        "trend",
        "comparison",
        "keywordCloud",
        "custom"
      ],
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    dataSource: {
      type: String,
      required: true,
      trim: true,
      // Examples:
      // "feedback.count"
      // "feedback.sentiment"
      // "analytics.monthlyTrend"
      // "analytics.tagBreakdown"
      // "ai.summary"
    },

    defaultFilters: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    config: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
      // chart options, colors, axis labels, min/max, etc.
    },

    refreshIntervalSeconds: {
      type: Number,
      default: 300, // 5min default
    },

    isPublic: {
      type: Boolean,
      default: false, // visible to all businesses?
    },

    allowedRoles: {
      type: [String],
      default: [], // ["admin", "manager"]
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

widgetSchema.index({ key: 1 });

const Widget = mongoose.model("Widget", widgetSchema);
export default Widget;
