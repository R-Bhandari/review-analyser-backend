import express from "express";
import {
  createAPILog,
  getAllAPILogs,
  getAPILogById
} from "../controllers/apiLogController.js";

const router = express.Router();

router.post("/", createAPILog);
router.get("/", getAllAPILogs);
router.get("/:id", getAPILogById);

export default router;
