import express from "express";
import {
  createAutoSummary,
  getAllSummaries,
  getSummaryById,
  deleteSummary,
  generateSummaryUsingAI,
} from "../controllers/autoSummaryController.js";

const router = express.Router();

router.post("/", createAutoSummary);
router.get("/", getAllSummaries);
router.get("/:id", getSummaryById);
router.delete("/:id", deleteSummary);

// For future AI-based generation
router.post("/generate", generateSummaryUsingAI);

export default router;
