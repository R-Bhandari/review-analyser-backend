import express from "express";
import {
  upsertTagAnalytics,
  getAllTagAnalytics,
  getTagAnalyticsById,
  deleteTagAnalytics,
} from "../controllers/tagAnalyticsController.js";

const router = express.Router();

router.post("/", upsertTagAnalytics);
router.get("/", getAllTagAnalytics);
router.get("/:id", getTagAnalyticsById);
router.delete("/:id", deleteTagAnalytics);

export default router;
