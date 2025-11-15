import express from "express";
import {
  createResolutionLog,
  getLogsByTask,
  deleteResolutionLog,
} from "../controllers/resolutionLogController.js";

import { verifyAccessToken } from "../../../middleware/authMiddleware.js";
import { requirePermission } from "../../../middleware/rbac/requirePermission.js";

const router = express.Router();

router.post(
  "/",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  createResolutionLog
);

router.get(
  "/task/:taskId",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  getLogsByTask
);

router.delete(
  "/:id",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  deleteResolutionLog
);

export default router;
