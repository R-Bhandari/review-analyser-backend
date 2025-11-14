import express from "express";
import {
  createReportTemplate,
  getAllReportTemplates,
  getReportTemplateByKey,
  updateReportTemplate,
  deleteReportTemplate
} from "../controllers/reportTemplateController.js";

const router = express.Router();

router.post("/", createReportTemplate);
router.get("/", getAllReportTemplates);
router.get("/:key", getReportTemplateByKey);
router.put("/:key", updateReportTemplate);
router.delete("/:key", deleteReportTemplate);

export default router;
