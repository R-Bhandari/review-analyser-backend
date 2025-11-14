// modules/system/models/featureFlagModel.js

import mongoose from "mongoose";

const targetRuleSchema = new mongoose.Schema(
  {
    targetType: {
      type: String,
      enum: ["global", "business", "user", "segment"],
      required: true
    },
    // for business/user identify specific id; for segment use key/value
    targetId: { type: String, required: false },
    percentage: { type: Number, required: false, min: 0, max: 100 } // optional rollout %
  },
  { _id: false }
);

const featureFlagSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true // e.g. "new_feedback_ui"
    },

    name: {
      type: String,
      required: false,
      trim: true
    },

    description: {
      type: String,
      required: false,
      trim: true
    },

    enabled: {
      type: Boolean,
      default: false // global default
    },

    // rules: ordered list of rules evaluated top -> bottom
    rules: {
      type: [targetRuleSchema],
      default: []
    },

    // optional default value (could be boolean or JSON) — helpful for non-boolean flags
    defaultValue: {
      type: mongoose.Schema.Types.Mixed,
      default: true
    },

    // metadata for UI / owner
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },

    isActive: { type: Boolean, default: true }, // soft-disable the flag entry itself
    tags: { type: [String], default: [] } // group flags like ["beta", "ui", "payments"]
  },
  { timestamps: true }
);

const FeatureFlag = mongoose.model("FeatureFlag", featureFlagSchema);
export default FeatureFlag;
