import express from "express";
import {
  createRefreshToken,
  getAllRefreshTokens,
  getRefreshTokensByUser,
  revokeRefreshToken,
  deleteRefreshToken
} from "../controllers/refreshTokenController.js";

const router = express.Router();

router.post("/", createRefreshToken);
router.get("/", getAllRefreshTokens);
router.get("/user/:userId", getRefreshTokensByUser);
router.put("/revoke/:id", revokeRefreshToken);
router.delete("/:id", deleteRefreshToken);

export default router;
