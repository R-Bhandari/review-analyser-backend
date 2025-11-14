import express from "express";
import {
  createAffiliatePartner,
  getAllAffiliatePartners,
  getAffiliatePartnerById,
  updateAffiliatePartner,
  deleteAffiliatePartner
} from "../controllers/affiliatePartnerController.js";

const router = express.Router();

router.post("/", createAffiliatePartner);
router.get("/", getAllAffiliatePartners);
router.get("/:id", getAffiliatePartnerById);
router.put("/:id", updateAffiliatePartner);
router.delete("/:id", deleteAffiliatePartner);

export default router;
