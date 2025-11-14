import IntegrationCredential from "../models/integrationCredentialModel.js";
import { encrypt, decrypt } from "../../../utils/encryption.js";

// Masking helper
const maskValue = (value) => {
  if (!value) return value;
  return value.slice(0, 4) + "****" + value.slice(-4);
};

// ➤ Create Credential
export const createIntegrationCredential = async (req, res) => {
  try {
    const encryptedCreds = {};

    for (const key in req.body.credentials) {
      encryptedCreds[key] = encrypt(req.body.credentials[key]);
    }

    const data = {
      ...req.body,
      credentials: encryptedCreds
    };

    const cred = await IntegrationCredential.create(data);

    res.status(201).json({
      success: true,
      message: "Credentials added successfully",
      data: {
        ...cred._doc,
        credentials: "****PROTECTED****" // never reveal
      }
    });
  } catch (error) {
    console.error("Error creating credentials:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get all credentials (masked)
export const getAllIntegrationCredentials = async (req, res) => {
  try {
    const creds = await IntegrationCredential.find();

    const masked = creds.map((c) => ({
      ...c._doc,
      credentials: Object.fromEntries(
        Object.entries(c.credentials).map(([key, val]) => [key, maskValue(decrypt(val))])
      )
    }));

    res.status(200).json({ success: true, data: masked });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Get credentials by integration (masked)
export const getIntegrationCredential = async (req, res) => {
  try {
    const cred = await IntegrationCredential.findOne({
      integrationName: req.params.integrationName
    });

    if (!cred)
      return res.status(404).json({
        success: false,
        message: "Credentials not found"
      });

    const masked = Object.fromEntries(
      Object.entries(cred.credentials).map(([key, val]) => [key, maskValue(decrypt(val))])
    );

    res.status(200).json({
      success: true,
      data: {
        ...cred._doc,
        credentials: masked
      }
    });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Update credentials
export const updateIntegrationCredential = async (req, res) => {
  try {
    const encryptedCreds = {};

    for (const key in req.body.credentials) {
      encryptedCreds[key] = encrypt(req.body.credentials[key]);
    }

    const updated = await IntegrationCredential.findOneAndUpdate(
      { integrationName: req.params.integrationName },
      {
        ...req.body,
        credentials: encryptedCreds,
        rotatedAt: Date.now()
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Credentials updated successfully",
      data: {
        ...updated._doc,
        credentials: "****PROTECTED****"
      }
    });
  } catch (error) {
    console.error("Error updating credentials:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ➤ Delete credentials
export const deleteIntegrationCredential = async (req, res) => {
  try {
    const deleted = await IntegrationCredential.findOneAndDelete({
      integrationName: req.params.integrationName
    });

    if (!deleted)
      return res.status(404).json({
        success: false,
        message: "Credentials not found"
      });

    res.status(200).json({
      success: true,
      message: "Credentials deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting credentials:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
