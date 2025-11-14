import express from "express";
import {
  createAuditLog,
  getAllAuditLogs,
  getAuditLogById
} from "../controllers/auditLogController.js";

const router = express.Router();

router.post("/", createAuditLog);
router.get("/", getAllAuditLogs);
router.get("/:id", getAuditLogById);

export default router;
