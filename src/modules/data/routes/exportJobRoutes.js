import express from "express";
import {
  createExportJob,
  getAllExportJobs,
  getBusinessExportJobs,
  getExportJobById,
  updateExportJob,
  deleteExportJob
} from "../controllers/exportJobController.js";

const router = express.Router();

router.post("/", createExportJob);
router.get("/", getAllExportJobs);
router.get("/business/:businessId", getBusinessExportJobs);
router.get("/:id", getExportJobById);
router.put("/:id", updateExportJob);
router.delete("/:id", deleteExportJob);

export default router;
