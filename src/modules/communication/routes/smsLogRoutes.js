import express from "express";
import {
  createSMSLog,
  getAllSMSLogs,
  getSMSLogById,
  deleteSMSLog,
} from "../controllers/smsLogController.js";

const router = express.Router();

router.post("/", createSMSLog);
router.get("/", getAllSMSLogs);
router.get("/:id", getSMSLogById);
router.delete("/:id", deleteSMSLog);

export default router;
