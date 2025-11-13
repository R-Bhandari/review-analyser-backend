import express from "express";
import {
  createEscalation,
  getEscalationsByTask,
  updateEscalation,
  deleteEscalation,
} from "../controllers/escalationController.js";

const router = express.Router();

router.post("/", createEscalation);
router.get("/task/:taskId", getEscalationsByTask);
router.put("/:id", updateEscalation);
router.delete("/:id", deleteEscalation);

export default router;
