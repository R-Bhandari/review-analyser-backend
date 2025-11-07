import express from "express";
import {
  upsertAnalyticsCache,
  getAnalyticsCache,
  getAnalyticsCacheById,
  deleteAnalyticsCache,
} from "../controllers/analyticsCacheController.js";

const router = express.Router();

router.post("/", upsertAnalyticsCache);
router.get("/", getAnalyticsCache);
router.get("/:id", getAnalyticsCacheById);
router.delete("/:id", deleteAnalyticsCache);

export default router;
