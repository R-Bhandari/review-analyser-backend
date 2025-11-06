import express from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentsByBusiness,
  getDepartmentById,
} from "../controllers/departmentController.js";

const router = express.Router();

router.post("/", createDepartment);
router.get("/", getAllDepartments);
router.get("/business/:businessId", getDepartmentsByBusiness);
router.get("/:id", getDepartmentById);

export default router;
