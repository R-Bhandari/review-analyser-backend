import express from "express";
import {
  createErrorLog,
  getAllErrorLogs,
  getErrorLogById,
  resolveErrorLog
} from "../controllers/errorLogController.js";

const router = express.Router();

router.post("/", createErrorLog);
router.get("/", getAllErrorLogs);
router.get("/:id", getErrorLogById);
router.put("/:id/resolve", resolveErrorLog);

export default router;
