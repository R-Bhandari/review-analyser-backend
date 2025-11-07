import express from "express";
import {
  createReportRecord,
  getAllReports,
  getReportById,
  updateReportRecord,
  deleteReportRecord,
  simulateReportGeneration,
} from "../controllers/reportRecordController.js";

const router = express.Router();

router.post("/", createReportRecord);
router.get("/", getAllReports);
router.get("/:id", getReportById);
router.put("/:id", updateReportRecord);
router.delete("/:id", deleteReportRecord);

// Simulation endpoint
router.post("/:id/generate", simulateReportGeneration);

export default router;
