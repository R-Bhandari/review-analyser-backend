import express from "express";
import {
  enqueueAITask,
  getAllQueuedTasks,
  updateTaskStatus,
  deleteTask,
  processNextAITask,
} from "../controllers/aiSummaryQueueController.js";

const router = express.Router();

router.post("/", enqueueAITask);
router.get("/", getAllQueuedTasks);
router.put("/:id", updateTaskStatus);
router.delete("/:id", deleteTask);

// Simulated background worker
router.post("/process", processNextAITask);

export default router;
