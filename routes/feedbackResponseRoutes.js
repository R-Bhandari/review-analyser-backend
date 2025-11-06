import express from "express";
import {
  createFeedbackResponse,
  getAllResponses,
  getResponsesByFeedback,
  getResponsesByTemplate,
} from "../controllers/feedbackResponseController.js";

const router = express.Router();

router.post("/", createFeedbackResponse);
router.get("/", getAllResponses);
router.get("/feedback/:feedbackId", getResponsesByFeedback);
router.get("/template/:templateId", getResponsesByTemplate);

export default router;
