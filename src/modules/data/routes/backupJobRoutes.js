import express from "express";
import {
  createBackupJob,
  getAllBackupJobs,
  getBusinessBackupJobs,
  getBackupJobById,
  updateBackupJob,
  deleteBackupJob
} from "../controllers/backupJobController.js";

const router = express.Router();

router.post("/", createBackupJob);
router.get("/", getAllBackupJobs);
router.get("/business/:businessId", getBusinessBackupJobs);
router.get("/:id", getBackupJobById);
router.put("/:id", updateBackupJob);
router.delete("/:id", deleteBackupJob);

export default router;
