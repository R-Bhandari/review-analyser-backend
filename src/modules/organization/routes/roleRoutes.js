import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleById,
  deleteRole,
} from "../controllers/roleController.js";

const router = express.Router();

router.post("/", createRole); // Create a new role
router.get("/", getAllRoles); // Get all roles
router.get("/:id", getRoleById); // Get role by ID
router.delete("/:id", deleteRole); // Delete role

export default router;
