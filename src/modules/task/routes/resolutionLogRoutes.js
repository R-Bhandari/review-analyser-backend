import express from "express";
import {
  createResolutionLog,
  getLogsByTask,
  deleteResolutionLog,
} from "../controllers/resolutionLogController.js";

const router = express.Router();

router.post("/", createResolutionLog);
router.get("/task/:taskId", getLogsByTask);
router.delete("/:id", deleteResolutionLog);

export default router;
