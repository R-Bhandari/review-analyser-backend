import express from "express";
import {
  createIntegrationConfig,
  getAllIntegrationConfigs,
  getIntegrationConfigByName,
  updateIntegrationConfig,
  deleteIntegrationConfig
} from "../controllers/integrationConfigController.js";

const router = express.Router();

router.post("/", createIntegrationConfig);
router.get("/", getAllIntegrationConfigs);
router.get("/:name", getIntegrationConfigByName);
router.put("/:name", updateIntegrationConfig);
router.delete("/:name", deleteIntegrationConfig);

export default router;
