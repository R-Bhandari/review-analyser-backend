import express from "express";
import {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", createFeedback);
router.get("/", getAllFeedback);
router.get("/:id", getFeedbackById);

export default router;
