import express from "express";
import {
  createFileRecord,
  getAllFiles,
  getFilesByBusiness,
  getFileById,
  updateFileRecord,
  deleteFileRecord
} from "../controllers/fileStorageController.js";

const router = express.Router();

router.post("/", createFileRecord);
router.get("/", getAllFiles);
router.get("/business/:businessId", getFilesByBusiness);
router.get("/:id", getFileById);
router.put("/:id", updateFileRecord);
router.delete("/:id", deleteFileRecord);

export default router;
