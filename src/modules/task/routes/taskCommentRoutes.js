import express from "express";
import {
  addComment,
  getCommentsByTask,
  deleteComment,
} from "../controllers/taskCommentController.js";

const router = express.Router();

router.post("/", addComment);
router.get("/task/:taskId", getCommentsByTask);
router.delete("/:id", deleteComment);

export default router;
