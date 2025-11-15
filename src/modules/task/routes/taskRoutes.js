import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import { verifyAccessToken } from "../../../middleware/authMiddleware.js";
import { requirePermission } from "../../../middleware/rbac/requirePermission.js";

const router = express.Router();

// Create task
router.post(
  "/",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  createTask
);

// Get all tasks
router.get(
  "/",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  getAllTasks
);

// Get one task
router.get(
  "/:id",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  getTaskById
);

// Update task
router.put(
  "/:id",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  updateTask
);

// Delete task
router.delete(
  "/:id",
  verifyAccessToken,
  requirePermission("tasks.manage"),
  deleteTask
);

export default router;
