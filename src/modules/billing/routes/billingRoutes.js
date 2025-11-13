import express from "express";
import {
  createBilling,
  getAllBilling,
  getBillingById,
  updateBilling,
  deleteBilling,
} from "../controllers/billingController.js";

const router = express.Router();

router.post("/", createBilling);
router.get("/", getAllBilling);
router.get("/:id", getBillingById);
router.put("/:id", updateBilling);
router.delete("/:id", deleteBilling);

export default router;
