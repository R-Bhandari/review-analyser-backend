import express from "express";
import {
  upsertTrendRecord,
  getTrendRecords,
  getTrendRecordsByRange,
  deleteTrendRecord,
} from "../controllers/trendRecordController.js";

const router = express.Router();

router.post("/", upsertTrendRecord);
router.get("/", getTrendRecords);
router.get("/range", getTrendRecordsByRange);
router.delete("/:id", deleteTrendRecord);

export default router;
