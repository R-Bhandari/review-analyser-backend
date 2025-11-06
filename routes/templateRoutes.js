import express from "express";
import {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  deleteTemplate,
} from "../controllers/templateController.js";

const router = express.Router();

router.post("/", createTemplate);
router.get("/", getAllTemplates);
router.get("/:id", getTemplateById);
router.delete("/:id", deleteTemplate);

export default router;
