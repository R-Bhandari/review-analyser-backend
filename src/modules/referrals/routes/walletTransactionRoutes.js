import express from "express";
import {
  createTransaction,
  getTransactionsByWallet,
  getTransactionById,
  deleteTransaction
} from "../controllers/walletTransactionController.js";

const router = express.Router();

router.post("/", createTransaction);
router.get("/wallet/:walletId", getTransactionsByWallet);
router.get("/:id", getTransactionById);
router.delete("/:id", deleteTransaction);

export default router;
