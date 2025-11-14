import express from "express";
import {
  createConfigVersion,
  getVersionsByConfig,
  getConfigVersionById,
  rollbackToVersion,
  deleteConfigVersion
} from "../controllers/configVersionController.js";

const router = express.Router();

// create manual snapshot (or system may call this automatically when changing config)
router.post("/", createConfigVersion);

// list versions for a specific configType + configId
router.get("/list/:configType/:configId", getVersionsByConfig);

// get a single version
router.get("/:id", getConfigVersionById);

// rollback to a version (ADMIN ONLY)
router.post("/rollback/:id", rollbackToVersion);

// delete a version (ADMIN ONLY)
router.delete("/:id", deleteConfigVersion);

export default router;
