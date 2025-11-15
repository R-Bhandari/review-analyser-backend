import express from "express";
import {
  revokeToken,
  checkTokenRevoked,
  getRevokedTokensByUser,
  deleteRevokedToken
} from "../controllers/revokedTokenController.js";

const router = express.Router();

router.post("/", revokeToken);
router.get("/check/:token", checkTokenRevoked);
router.get("/user/:userId", getRevokedTokensByUser);
router.delete("/:id", deleteRevokedToken);

export default router;
