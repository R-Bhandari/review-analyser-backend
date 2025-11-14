import express from "express";
import {
  createSavedReport,
  getAllSavedReports,
  getBusinessReports,
  getSavedReportById,
  deleteSavedReport
} from "../controllers/savedReportController.js";

const router = express.Router();

router.post("/", createSavedReport);
router.get("/", getAllSavedReports);
router.get("/business/:businessId", getBusinessReports);
router.get("/:id", getSavedReportById);
router.delete("/:id", deleteSavedReport);

export default router;
