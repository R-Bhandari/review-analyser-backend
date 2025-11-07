import express from "express";
import {
  createAutomationJob,
  getAllAutomationJobs,
  getAutomationJobById,
  updateAutomationJob,
  deleteAutomationJob,
  simulateJobRun,
} from "../controllers/automationJobController.js";

const router = express.Router();

router.post("/", createAutomationJob);
router.get("/", getAllAutomationJobs);
router.get("/:id", getAutomationJobById);
router.put("/:id", updateAutomationJob);
router.delete("/:id", deleteAutomationJob);

// Simulated job execution endpoint
router.post("/:id/run", simulateJobRun);

export default router;
