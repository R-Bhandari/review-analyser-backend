import express from "express";
import {
  createEscalation,
  getEscalationsByTask,
  updateEscalation,
  deleteEscalation,
} from "../controllers/escalationController.js";

import { verifyAccessToken } from "../../../middleware/authMiddleware.js";
import { requirePermission } from "../../../middleware/rbac/requirePermission.js";

const router = express.Router();

router.post(
  "/",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  createEscalation
);

router.get(
  "/task/:taskId",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  getEscalationsByTask
);

router.put(
  "/:id",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  updateEscalation
);

router.delete(
  "/:id",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  deleteEscalation
);

export default router;
