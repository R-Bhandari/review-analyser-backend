import express from "express";
import {
  createBranch,
  getAllBranches,
  getBranchById,
  getBranchesByBusiness,
} from "../controllers/branchController.js";

import { verifyAccessToken } from "../../../middleware/authMiddleware.js";
import { requirePermission } from "../../../middleware/rbac/requirePermission.js";

const router = express.Router();

// Create branch
router.post(
  "/",
  verifyAccessToken,
  requirePermission("branch.manage"),
  createBranch
);

// All branches
router.get(
  "/",
  verifyAccessToken,
  requirePermission("branch.manage"),
  getAllBranches
);

// Single branch
router.get(
  "/:id",
  verifyAccessToken,
  requirePermission("branch.manage"),
  getBranchById
);

// Branches of one business
router.get(
  "/business/:businessId",
  verifyAccessToken,
  requirePermission("branch.manage"),
  getBranchesByBusiness
);

export default router;
