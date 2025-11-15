// src/modules/auth/routes/authSessionRoutes.js

import express from "express";
import {
  createSession,
  getAllSessions,
  getUserSessions,
  revokeSession,
  deleteSession,
  loginUser,
  refreshAccessToken
} from "../controllers/authSessionController.js";

const router = express.Router();

/* --------------------------------------------
   AUTH + JWT ENDPOINTS
--------------------------------------------- */

// User Login (email + password)
router.post("/login", loginUser);

// Refresh access token using refresh token cookie
router.post("/refresh-token", refreshAccessToken);

/* --------------------------------------------
   SESSION MANAGEMENT (Admin Tools)
--------------------------------------------- */

router.post("/", createSession);
router.get("/", getAllSessions);
router.get("/user/:userId", getUserSessions);
router.put("/revoke/:id", revokeSession);
router.delete("/:id", deleteSession);

export default router;
