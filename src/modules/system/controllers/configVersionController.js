import ConfigVersion from "../models/configVersionModel.js";
import SystemSetting from "../models/systemSettingModel.js";
import IntegrationConfig from "../models/integrationConfigModel.js";

/**
 * Create a new version snapshot for a given config document.
 * Body expects:
 *  - configType: "SystemSetting" | "IntegrationConfig"
 *  - configId: ObjectId of the config
 *  - snapshot: the full document JSON (server can also fetch it)
 *  - createdBy (optional)
 *  - notes (optional)
 */
export const createConfigVersion = async (req, res) => {
  try {
    const { configType, configId, snapshot, createdBy, notes } = req.body;

    // determine next version number
    const last = await ConfigVersion.findOne({ configType, configId })
      .sort({ versionNumber: -1 })
      .lean();

    const nextVersion = last ? last.versionNumber + 1 : 1;

    const version = await ConfigVersion.create({
      configType,
      configId,
      versionNumber: nextVersion,
      snapshot,
      createdBy,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Config version created",
      data: version,
    });
  } catch (error) {
    console.error("Error creating config version:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get versions for a config (paginated optional)
export const getVersionsByConfig = async (req, res) => {
  try {
    const { configType, configId } = req.params;
    const versions = await ConfigVersion.find({ configType, configId })
      .sort({ versionNumber: -1 });

    res.status(200).json({ success: true, data: versions });
  } catch (error) {
    console.error("Error fetching config versions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get a single version by id
export const getConfigVersionById = async (req, res) => {
  try {
    const version = await ConfigVersion.findById(req.params.id);
    if (!version)
      return res.status(404).json({ success: false, message: "Version not found" });

    res.status(200).json({ success: true, data: version });
  } catch (error) {
    console.error("Error fetching config version:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Rollback helper: replace live config with snapshot of version
// NOTE: this operation is powerful — ensure admin-only access & audit logging when calling.
export const rollbackToVersion = async (req, res) => {
  try {
    const version = await ConfigVersion.findById(req.params.id);
    if (!version) return res.status(404).json({ success: false, message: "Version not found" });

    if (!version.rollbackEligible)
      return res.status(403).json({ success: false, message: "This version is not eligible for rollback" });

    const { configType, configId, snapshot } = version;

    let updated;
    if (configType === "SystemSetting") {
      updated = await SystemSetting.findByIdAndUpdate(configId, snapshot, { new: true });
    } else if (configType === "IntegrationConfig") {
      updated = await IntegrationConfig.findByIdAndUpdate(configId, snapshot, { new: true });
    } else {
      return res.status(400).json({ success: false, message: "Unsupported configType" });
    }

    // create a new version entry for the rollback action (audit)
    const last = await ConfigVersion.findOne({ configType, configId }).sort({ versionNumber: -1 }).lean();
    const newVersionNumber = last ? last.versionNumber + 1 : 1;

    const rollbackSnapshot = updated ? updated.toObject() : snapshot;

    await ConfigVersion.create({
      configType,
      configId,
      versionNumber: newVersionNumber,
      snapshot: rollbackSnapshot,
      createdBy: req.body.performedBy || null,
      notes: `Rollback to version ${version.versionNumber} (${version._id})`,
      rollbackEligible: true
    });

    res.status(200).json({
      success: true,
      message: "Rollback completed and new version recorded",
      data: updated,
    });
  } catch (error) {
    console.error("Error during rollback:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Delete a version (rare; admin-only)
export const deleteConfigVersion = async (req, res) => {
  try {
    const deleted = await ConfigVersion.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Version not found" });

    res.status(200).json({ success: true, message: "Version deleted" });
  } catch (error) {
    console.error("Error deleting config version:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
