import express from "express";
import {
  createAccessToken,
  getAllAccessTokens,
  getAccessTokensByUser,
  revokeAccessToken,
  deleteAccessToken
} from "../controllers/accessTokenController.js";

const router = express.Router();

router.post("/", createAccessToken);
router.get("/", getAllAccessTokens);
router.get("/user/:userId", getAccessTokensByUser);
router.put("/revoke/:id", revokeAccessToken);
router.delete("/:id", deleteAccessToken);

export default router;
