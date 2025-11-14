import express from "express";
import {
  createImportJob,
  getAllImportJobs,
  getBusinessImportJobs,
  getImportJobById,
  updateImportJob,
  deleteImportJob
} from "../controllers/importJobController.js";

const router = express.Router();

router.post("/", createImportJob);
router.get("/", getAllImportJobs);
router.get("/business/:businessId", getBusinessImportJobs);
router.get("/:id", getImportJobById);
router.put("/:id", updateImportJob);
router.delete("/:id", deleteImportJob);

export default router;
