import express from "express";
import {
  createTag,
  getAllTags,
  getTagById,
  deleteTag,
} from "../controllers/categoryTagController.js";

const router = express.Router();

router.post("/", createTag);
router.get("/", getAllTags);
router.get("/:id", getTagById);
router.delete("/:id", deleteTag);

export default router;
