import express from "express";
import { generateBranchQRCode } from "../controllers/qrCodeController.js";

const router = express.Router();

// Generate QR for a specific branch
router.get("/branch/:branchId", generateBranchQRCode);

export default router;
