import express from "express";
import {
  generateOtp,
  verifyOtp,
  deleteOtp
} from "../controllers/otpVerificationController.js";

const router = express.Router();

router.post("/generate", generateOtp);
router.post("/verify/:id", verifyOtp);
router.delete("/:id", deleteOtp);

export default router;
