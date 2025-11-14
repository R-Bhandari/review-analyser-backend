import express from "express";
import {
  createIntegrationCredential,
  getAllIntegrationCredentials,
  getIntegrationCredential,
  updateIntegrationCredential,
  deleteIntegrationCredential
} from "../controllers/integrationCredentialController.js";

const router = express.Router();

router.post("/", createIntegrationCredential);
router.get("/", getAllIntegrationCredentials);
router.get("/:integrationName", getIntegrationCredential);
router.put("/:integrationName", updateIntegrationCredential);
router.delete("/:integrationName", deleteIntegrationCredential);

export default router;
