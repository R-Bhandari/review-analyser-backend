import express from "express";
import {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
} from "../controllers/feedbackController.js";

import { verifyAccessToken } from "../../../middleware/authMiddleware.js";
import { requirePermission } from "../../../middleware/rbac/requirePermission.js";

const router = express.Router();

// PUBLIC - customers submit feedback
router.post("/", createFeedback);

// PROTECTED - internal users view feedback
router.get(
  "/",
  verifyAccessToken,
  requirePermission("feedback.view"),
  getAllFeedback
);

router.get(
  "/:id",
  verifyAccessToken,
  requirePermission("feedback.view"),
  getFeedbackById
);

export default router;
