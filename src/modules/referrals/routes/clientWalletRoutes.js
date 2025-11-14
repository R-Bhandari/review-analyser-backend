import express from "express";
import {
  createClientWallet,
  getWalletByBusiness,
  updateClientWallet,
  deleteClientWallet
} from "../controllers/clientWalletController.js";

const router = express.Router();

router.post("/", createClientWallet);
router.get("/:businessId", getWalletByBusiness);
router.put("/:businessId", updateClientWallet);
router.delete("/:businessId", deleteClientWallet);

export default router;
