import express from "express";
import { 
  createBusiness, 
  getAllBusinesses, 
  getBusinessById 
} from "../controllers/businessController.js";

import { verifyAccessToken } from "../../../middleware/authMiddleware.js";
import { requirePermission } from "../../../middleware/rbac/requirePermission.js";

const router = express.Router();

// Create a new business
router.post(
  "/", 
  verifyAccessToken,
  requirePermission("business.manage"),
  createBusiness
);

// Get all businesses (only inside the user's business scope)
router.get(
  "/", 
  verifyAccessToken,
  requirePermission("business.manage"),
  getAllBusinesses
);

// Get business by ID
router.get(
  "/:id", 
  verifyAccessToken,
  requirePermission("business.manage"),
  getBusinessById
);

export default router;
