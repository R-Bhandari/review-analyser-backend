import express from "express";
import {
  createWhatsAppLog,
  getAllWhatsAppLogs,
  getWhatsAppLogById,
  deleteWhatsAppLog,
} from "../controllers/whatsappLogController.js";

const router = express.Router();

router.post("/", createWhatsAppLog);
router.get("/", getAllWhatsAppLogs);
router.get("/:id", getWhatsAppLogById);
router.delete("/:id", deleteWhatsAppLog);

export default router;
