import express from "express";
import {
  updateExternalServiceHealth,
  getAllExternalServiceHealth,
  getExternalServiceHealth
} from "../controllers/externalServiceHealthController.js";

const router = express.Router();

router.post("/", updateExternalServiceHealth); // Upsert health check result
router.get("/", getAllExternalServiceHealth);
router.get("/:integrationName/:environment?", getExternalServiceHealth);

export default router;
