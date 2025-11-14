import mongoose from "mongoose";

const widgetDataCacheSchema = new mongoose.Schema(
  {
    widgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Widget",
      required: true
    },

    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true
    },

    dashboardKey: {
      type: String,
      required: true // "admin_main", "branch_overview"
    },

    filtersHash: {
      type: String,
      required: true,
      index: true
      /*
        Hash of filters:
        e.g., MD5(JSON.stringify(filters))
        Ensures unique cache for each filter combination
      */
    },

    cachedData: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
      /*
        Example:
        {
          totalFeedback: 1240,
          positive: 780,
          negative: 120,
          trend: [...]
        }
      */
    },

    refreshIntervalSeconds: {
      type: Number,
      default: 300 // 5 minutes
    },

    lastComputedAt: {
      type: Date,
      default: Date.now
    },

    isExpired: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

widgetDataCacheSchema.index({ widgetId: 1, businessId: 1, dashboardKey: 1 });

const WidgetDataCache = mongoose.model("WidgetDataCache", widgetDataCacheSchema);
export default WidgetDataCache;
