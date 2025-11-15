import express from "express";
import {
  recordLoginAttempt,
  getLoginAttemptsByUser,
  getLoginAttemptsByIdentifier,
  deleteLoginAttempt,
  clearUserLoginAttempts
} from "../controllers/loginAttemptController.js";

const router = express.Router();

router.post("/", recordLoginAttempt);
router.get("/user/:userId", getLoginAttemptsByUser);
router.get("/identifier/:identifier", getLoginAttemptsByIdentifier);
router.delete("/:id", deleteLoginAttempt);
router.delete("/user/:userId", clearUserLoginAttempts);

export default router;
