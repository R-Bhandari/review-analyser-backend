import express from "express";
import {
  createVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher
} from "../controllers/rewardVoucherController.js";

const router = express.Router();

router.post("/", createVoucher);
router.get("/", getAllVouchers);
router.get("/:id", getVoucherById);
router.put("/:id", updateVoucher);
router.delete("/:id", deleteVoucher);

export default router;
