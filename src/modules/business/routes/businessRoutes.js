import express from "express";
import { createBusiness, getAllBusinesses, getBusinessById } from "../controllers/businessController.js";

const router = express.Router();

router.post("/", createBusiness); // Create a new business
router.get("/", getAllBusinesses); // Get all businesses
router.get("/:id", getBusinessById); // Get business by ID

export default router;
