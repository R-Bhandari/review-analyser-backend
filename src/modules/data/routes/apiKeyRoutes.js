import express from "express";
import {
  createApiKey,
  getAllApiKeys,
  getApiKeysByBusiness,
  getApiKeyById,
  updateApiKey,
  toggleApiKeyStatus,
  deleteApiKey
} from "../controllers/apiKeyController.js";

const router = express.Router();

router.post("/", createApiKey);
router.get("/", getAllApiKeys);
router.get("/business/:businessId", getApiKeysByBusiness);
router.get("/:id", getApiKeyById);
router.put("/:id", updateApiKey);
router.put("/toggle/:id", toggleApiKeyStatus);
router.delete("/:id", deleteApiKey);

export default router;
