import express from "express";
import {
  createRateLimitPolicy,
  getAllPolicies,
  getPolicyByKey,
  updateRateLimitPolicy,
  deleteRateLimitPolicy
} from "../controllers/rateLimitPolicyController.js";

const router = express.Router();

router.post("/", createRateLimitPolicy);
router.get("/", getAllPolicies);
router.get("/:key", getPolicyByKey);
router.put("/:key", updateRateLimitPolicy);
router.delete("/:key", deleteRateLimitPolicy);

export default router;
