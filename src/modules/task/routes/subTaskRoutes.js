import express from "express";
import {
  createSubTask,
  getSubTasksByTask,
  updateSubTask,
  deleteSubTask,
} from "../controllers/subTaskController.js";

const router = express.Router();

router.post("/", createSubTask);
router.get("/task/:taskId", getSubTasksByTask);
router.put("/:id", updateSubTask);
router.delete("/:id", deleteSubTask);

export default router;
