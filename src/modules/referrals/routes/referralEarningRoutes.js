import express from "express";
import {
  createReferralEarning,
  getAllReferralEarnings,
  getReferralEarningById,
  updateReferralEarning,
  deleteReferralEarning
} from "../controllers/referralEarningController.js";

const router = express.Router();

router.post("/", createReferralEarning);
router.get("/", getAllReferralEarnings);
router.get("/:id", getReferralEarningById);
router.put("/:id", updateReferralEarning);
router.delete("/:id", deleteReferralEarning);

export default router;
