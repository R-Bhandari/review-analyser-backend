import express from "express";
import {
  createRefundRequest,
  getAllRefundRequests,
  getRefundRequestById,
  updateRefundRequest,
  deleteRefundRequest
} from "../controllers/refundRequestController.js";

const router = express.Router();

router.post("/", createRefundRequest);
router.get("/", getAllRefundRequests);
router.get("/:id", getRefundRequestById);
router.put("/:id", updateRefundRequest);
router.delete("/:id", deleteRefundRequest);

export default router;
