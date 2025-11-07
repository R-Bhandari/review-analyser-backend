import express from "express";
import {
  createTrainingRecord,
  getAllTrainingRecords,
  getTrainingRecordById,
  updateTrainingRecord,
  deleteTrainingRecord,
} from "../controllers/responseTrainingController.js";

const router = express.Router();

router.post("/", createTrainingRecord);
router.get("/", getAllTrainingRecords);
router.get("/:id", getTrainingRecordById);
router.put("/:id", updateTrainingRecord);
router.delete("/:id", deleteTrainingRecord);

export default router;
