import express from "express";
import {
  upsertSummary,
  getSummaries,
  getSummariesByRange,
  deleteSummary,
} from "../controllers/analyticsSummaryController.js";

const router = express.Router();

router.post("/", upsertSummary);
router.get("/", getSummaries);
router.get("/range", getSummariesByRange);
router.delete("/:id", deleteSummary);

export default router;
