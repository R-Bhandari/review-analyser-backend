import express from "express";
import {
  createSubTask,
  getSubTasksByTask,
  updateSubTask,
  deleteSubTask,
} from "../controllers/subTaskController.js";

import { verifyAccessToken } from "../../../middleware/authMiddleware.js";
import { requirePermission } from "../../../middleware/rbac/requirePermission.js";

const router = express.Router();

router.post(
  "/",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  createSubTask
);

router.get(
  "/task/:taskId",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  getSubTasksByTask
);

router.put(
  "/:id",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  updateSubTask
);

router.delete(
  "/:id",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  deleteSubTask
);

export default router;
