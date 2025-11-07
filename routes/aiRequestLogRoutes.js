import express from "express";
import {
  createAIRequestLog,
  getAllAIRequestLogs,
  getAIRequestLogById,
  deleteAIRequestLog,
} from "../controllers/aiRequestLogController.js";

const router = express.Router();

router.post("/", createAIRequestLog);
router.get("/", getAllAIRequestLogs);
router.get("/:id", getAIRequestLogById);
router.delete("/:id", deleteAIRequestLog);

export default router;
