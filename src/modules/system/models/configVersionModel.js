// modules/system/models/configVersionModel.js

import mongoose from "mongoose";

const configVersionSchema = new mongoose.Schema(
  {
    configType: {
      type: String,
      required: true,
      enum: ["SystemSetting", "IntegrationConfig"],
      // add more types here if you version others
    },

    configId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // refPath not used because it's polymorphic snapshot reference
    },

    versionNumber: {
      type: Number,
      required: true,
    },

    snapshot: {
      type: mongoose.Schema.Types.Mixed, // full JSON snapshot of the document
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    notes: {
      type: String,
      trim: true,
      required: false,
    },

    rollbackEligible: {
      type: Boolean,
      default: true,
      // allow some versions to be marked non-rollbackable by policy
    }
  },
  { timestamps: true }
);

configVersionSchema.index({ configType: 1, configId: 1, versionNumber: -1 });

const ConfigVersion = mongoose.model("ConfigVersion", configVersionSchema);
export default ConfigVersion;
