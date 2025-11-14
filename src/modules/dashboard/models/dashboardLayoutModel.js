import mongoose from "mongoose";

const widgetPositionSchema = new mongoose.Schema(
  {
    widgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Widget",
      required: true
    },

    x: { type: Number, required: true },     // grid column start
    y: { type: Number, required: true },     // grid row start
    w: { type: Number, required: true },     // width
    h: { type: Number, required: true },     // height

    // optional per-widget filter override
    filters: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { _id: false }
);

const dashboardLayoutSchema = new mongoose.Schema(
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
      trim: true
    },

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

    widgets: [widgetPositionSchema],

    isDefault: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

dashboardLayoutSchema.index({ key: 1 });
dashboardLayoutSchema.index({ userId: 1 });
dashboardLayoutSchema.index({ businessId: 1 });

const DashboardLayout = mongoose.model("DashboardLayout", dashboardLayoutSchema);
export default DashboardLayout;
