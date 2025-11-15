import express from "express";
import {
  linkSocialAccount,
  getUserSocialAccounts,
  getProviderAccount,
  unlinkSocialAccount
} from "../controllers/socialAccountController.js";

const router = express.Router();

router.post("/link", linkSocialAccount);
router.get("/user/:userId", getUserSocialAccounts);
router.get("/provider/:userId/:provider", getProviderAccount);
router.delete("/:id", unlinkSocialAccount);

export default router;
