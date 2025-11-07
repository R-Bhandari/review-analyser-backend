import express from "express";
import {
  createBranch,
  getAllBranches,
  getBranchById,
  getBranchesByBusiness,
} from "../controllers/branchController.js";

const router = express.Router();

router.post("/", createBranch); // Create branch
router.get("/", getAllBranches); // All branches
router.get("/:id", getBranchById); // Single branch
router.get("/business/:businessId", getBranchesByBusiness); // Branches of one business

export default router;
