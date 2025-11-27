import express from "express";
import { 
  createBusiness, 
  getAllBusinesses, 
  getBusinessById 
} from "../controllers/businessController.js";

import { verifyAccessToken } from "../../../middleware/authMiddleware.js";
import { requirePermission } from "../../../middleware/rbac/requirePermission.js";
import { validate } from "../../../middleware/validate.js";
import { createBusinessSchema } from "../validation/businessValidation.js";

const router = express.Router();

// Create a new business
router.post(
  "/", 
  verifyAccessToken,
  requirePermission("business.manage"),
  validate(createBusinessSchema),
  createBusiness
);

// Get all businesses
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
