import express from "express";
import {
  createSentimentSummary,
  getAllSummaries,
  getSummariesByBusiness,
  getSummariesByType,
} from "../controllers/sentimentSummaryController.js";

const router = express.Router();

router.post("/", createSentimentSummary);
router.get("/", getAllSummaries);
router.get("/business/:businessId", getSummariesByBusiness);
router.get("/type/:type", getSummariesByType);

export default router;
