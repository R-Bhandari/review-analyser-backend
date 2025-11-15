import express from "express";
import {
  createOAuthClient,
  getUserOAuthClients,
  getOAuthClientById,
  disableOAuthClient,
  deleteOAuthClient
} from "../controllers/oAuthClientController.js";

const router = express.Router();

router.post("/", createOAuthClient);
router.get("/user/:userId", getUserOAuthClients);
router.get("/:id", getOAuthClientById);
router.put("/disable/:id", disableOAuthClient);
router.delete("/:id", deleteOAuthClient);

export default router;
