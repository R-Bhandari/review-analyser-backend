import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionsByTemplate,
  getQuestionById,
  deleteQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/", createQuestion);
router.get("/", getAllQuestions);
router.get("/template/:templateId", getQuestionsByTemplate);
router.get("/:id", getQuestionById);
router.delete("/:id", deleteQuestion);

export default router;
