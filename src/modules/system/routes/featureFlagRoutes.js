import express from "express";
import {
  createFeatureFlag,
  getAllFeatureFlags,
  getFeatureFlagByKey,
  updateFeatureFlag,
  deleteFeatureFlag
} from "../controllers/featureFlagController.js";

const router = express.Router();

router.post("/", createFeatureFlag);
router.get("/", getAllFeatureFlags);
router.get("/:key", getFeatureFlagByKey);
router.put("/:key", updateFeatureFlag);
router.delete("/:key", deleteFeatureFlag);

export default router;
