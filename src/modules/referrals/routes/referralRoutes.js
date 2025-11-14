import express from "express";
import {
  createReferral,
  getAllReferrals,
  getReferralById,
  updateReferral,
  deleteReferral
} from "../controllers/referralController.js";

const router = express.Router();

router.post("/", createReferral);
router.get("/", getAllReferrals);
router.get("/:id", getReferralById);
router.put("/:id", updateReferral);
router.delete("/:id", deleteReferral);

export default router;
