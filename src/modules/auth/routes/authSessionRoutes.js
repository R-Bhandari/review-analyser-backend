import express from "express";
import {
  createSession,
  getAllSessions,
  getUserSessions,
  revokeSession,
  deleteSession
} from "../controllers/authSessionController.js";

const router = express.Router();

router.post("/", createSession);
router.get("/", getAllSessions);
router.get("/user/:userId", getUserSessions);
router.put("/revoke/:id", revokeSession);
router.delete("/:id", deleteSession);

export default router;
