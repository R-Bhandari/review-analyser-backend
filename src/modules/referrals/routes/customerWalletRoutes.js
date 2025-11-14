import express from "express";
import {
  createCustomerWallet,
  getCustomerWallet,
  updateCustomerWallet,
  deleteCustomerWallet
} from "../controllers/customerWalletController.js";

const router = express.Router();

router.post("/", createCustomerWallet);
router.get("/:customerId", getCustomerWallet);
router.put("/:customerId", updateCustomerWallet);
router.delete("/:customerId", deleteCustomerWallet);

export default router;
