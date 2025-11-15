import express from "express";
import {
  createConsent,
  getAllConsents,
  getUserConsents,
  getLatestConsent,
  withdrawConsent,
  deleteConsent
} from "../controllers/consentController.js";

const router = express.Router();

router.post("/", createConsent);
router.get("/", getAllConsents);
router.get("/user/:userId", getUserConsents);
router.get("/latest", getLatestConsent); // query params: ?userId=...&consentType=terms
router.put("/withdraw/:id", withdrawConsent);
router.delete("/:id", deleteConsent);

export default router;
