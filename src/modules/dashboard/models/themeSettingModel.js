import mongoose from "mongoose";

const themeSettingSchema = new mongoose.Schema(
  {
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

    // Dark / Light mode
    themeMode: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "light"
    },

    // Primary/Accent color palette
    colors: {
      primary: { type: String, default: "#2563eb" },
      secondary: { type: String, default: "#64748b" },
      background: { type: String, default: "#ffffff" },
      card: { type: String, default: "#f8fafc" },
      success: { type: String, default: "#22c55e" },
      warning: { type: String, default: "#f59e0b" },
      danger: { type: String, default: "#ef4444" }
    },

    // Chart UI theme variants
    chartTheme: {
      type: String,
      enum: ["default", "vibrant", "pastel", "minimal", "contrast"],
      default: "default"
    },

    // Typography
    fontFamily: {
      type: String,
      default: "Inter"
    },

    fontSize: {
      type: String,
      enum: ["small", "medium", "large"],
      default: "medium"
    },

    // Dashboard Layout Density
    density: {
      type: String,
      enum: ["comfortable", "compact"],
      default: "comfortable"
    },

    // Brand logo
    logoUrl: {
      type: String,
      default: null
    },

    // Custom CSS override (optional)
    customCSS: {
      type: String,
      default: ""
    },

    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

themeSettingSchema.index({ businessId: 1 });
themeSettingSchema.index({ userId: 1 });

const ThemeSetting = mongoose.model("ThemeSetting", themeSettingSchema);
export default ThemeSetting;
