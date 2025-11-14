import express from "express";
import {
  createWebhookEvent,
  getAllWebhookEvents,
  getWebhookEventById,
  updateWebhookProcessingStatus
} from "../controllers/webhookEventController.js";

const router = express.Router();

router.post("/", createWebhookEvent);
router.get("/", getAllWebhookEvents);
router.get("/:id", getWebhookEventById);
router.put("/:id/status", updateWebhookProcessingStatus);

export default router;
