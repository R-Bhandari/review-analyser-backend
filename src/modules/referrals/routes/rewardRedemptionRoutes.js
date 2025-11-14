import express from "express";
import {
  createRedemption,
  getAllRedemptions,
  getRedemptionById,
  updateRedemption,
  deleteRedemption
} from "../controllers/rewardRedemptionController.js";

const router = express.Router();

router.post("/", createRedemption);
router.get("/", getAllRedemptions);
router.get("/:id", getRedemptionById);
router.put("/:id", updateRedemption);
router.delete("/:id", deleteRedemption);

export default router;
