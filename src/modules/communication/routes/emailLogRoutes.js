import express from "express";
import {
  createEmailLog,
  getAllEmailLogs,
  getEmailLogById,
  deleteEmailLog,
} from "../controllers/emailLogController.js";

const router = express.Router();

router.post("/", createEmailLog);
router.get("/", getAllEmailLogs);
router.get("/:id", getEmailLogById);
router.delete("/:id", deleteEmailLog);

export default router;
