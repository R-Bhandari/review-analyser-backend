import express from "express";
import {
  upsertAIConfig,
  getAIConfig,
  deleteAIConfig,
} from "../controllers/aiConfigController.js";

const router = express.Router();

router.post("/", upsertAIConfig);
router.get("/", getAIConfig);
router.delete("/:id", deleteAIConfig);

export default router;
