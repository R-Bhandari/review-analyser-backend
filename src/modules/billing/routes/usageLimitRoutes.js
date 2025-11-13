import express from "express";
import {
  createUsageLimit,
  getUsageBySubscription,
  updateUsage,
  deleteUsage,
} from "../controllers/usageLimitController.js";

const router = express.Router();

router.post("/", createUsageLimit);
router.get("/subscription/:subscriptionId", getUsageBySubscription);
router.put("/:id", updateUsage);
router.delete("/:id", deleteUsage);

export default router;
