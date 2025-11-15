import express from "express";
import {
  addComment,
  getCommentsByTask,
  deleteComment,
} from "../controllers/taskCommentController.js";

import { verifyAccessToken } from "../../../middleware/authMiddleware.js";
import { requirePermission } from "../../../middleware/rbac/requirePermission.js";

const router = express.Router();

router.post(
  "/",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  addComment
);

router.get(
  "/task/:taskId",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  getCommentsByTask
);

router.delete(
  "/:id",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  deleteComment
);

export default router;
