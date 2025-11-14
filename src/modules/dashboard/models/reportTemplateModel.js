import mongoose from "mongoose";

const reportTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    key: {
      type: String,
      required: true,
      unique: true,
      trim: true // e.g., "monthly_summary", "sentiment_trend", etc.
    },

    description: {
      type: String,
      trim: true
    },

    templateType: {
      type: String,
      enum: ["pdf", "excel", "dashboardSnapshot"],
      default: "pdf"
    },

    widgets: [
      {
        widgetId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Widget",
          required: true
        },
        order: {
          type: Number,
          default: 0
        }
      }
    ],

    defaultFilters: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
      /*
        Example:
        {
          dateRange: "last_30_days",
          includeBranches: ["all"],
          includeTags: ["service", "quality"]
        }
      */
    },

    layoutConfig: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
      /*
        Example:
        {
          header: true,
          footer: true,
          pageOrientation: "portrait",
          columns: 2
        }
      */
    },

    isGlobal: {
      type: Boolean,
      default: false // if false → belongs to a business
    },

    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: false
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

reportTemplateSchema.index({ key: 1 });
reportTemplateSchema.index({ businessId: 1 });

const ReportTemplate = mongoose.model("ReportTemplate", reportTemplateSchema);
export default ReportTemplate;
