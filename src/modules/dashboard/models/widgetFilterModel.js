import mongoose from "mongoose";

const widgetFilterSchema = new mongoose.Schema(
  {
    widgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Widget",
      required: true
    },

    dashboardKey: {
      type: String,
      required: true // "admin_main", "branch_overview", etc.
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false // filters can be global or per-user
    },

    filters: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
      /*
        Example:
        {
          dateRange: { from: "2024-01-01", to: "2024-01-31" },
          branchId: "67463f21...",
          sentiment: ["positive", "neutral"],
          tags: ["service", "quality"],
          ratingRange: { min: 3, max: 5 }
        }
      */
    },

    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

widgetFilterSchema.index({ widgetId: 1, dashboardKey: 1, userId: 1 });

const WidgetFilter = mongoose.model("WidgetFilter", widgetFilterSchema);
export default WidgetFilter;
