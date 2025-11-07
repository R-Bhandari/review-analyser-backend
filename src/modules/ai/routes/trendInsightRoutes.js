import express from "express";
import {
  createTrendInsight,
  getAllTrendInsights,
  getTrendInsightById,
  deleteTrendInsight,
  generateTrendInsight,
} from "../controllers/trendInsightController.js";

const router = express.Router();

router.post("/", createTrendInsight);
router.get("/", getAllTrendInsights);
router.get("/:id", getTrendInsightById);
router.delete("/:id", deleteTrendInsight);

// AI Simulation
router.post("/generate", generateTrendInsight);

export default router;
