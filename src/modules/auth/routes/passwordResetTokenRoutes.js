import express from "express";
import {
  createResetToken,
  verifyResetToken,
  markTokenUsed,
  deleteResetToken
} from "../controllers/passwordResetTokenController.js";

const router = express.Router();

router.post("/", createResetToken);
router.get("/verify/:token", verifyResetToken);
router.put("/use/:id", markTokenUsed);
router.delete("/:id", deleteResetToken);

export default router;
