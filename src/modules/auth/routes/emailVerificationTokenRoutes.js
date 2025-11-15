import express from "express";
import {
  createEmailVerificationToken,
  verifyEmailToken,
  deleteEmailVerificationToken,
  getVerificationTokensByUser
} from "../controllers/emailVerificationTokenController.js";

const router = express.Router();

router.post("/", createEmailVerificationToken);
router.get("/verify/:token", verifyEmailToken);
router.get("/user/:userId", getVerificationTokensByUser);
router.delete("/:id", deleteEmailVerificationToken);

export default router;
