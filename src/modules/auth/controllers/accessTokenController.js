import { nanoid } from "nanoid";
import AccessToken from "../models/accessTokenModel.js";

// Create access token
export const createAccessToken = async (req, res) => {
  try {
    const token = `atk_${nanoid(32)}`;

    const accessToken = await AccessToken.create({
      ...req.body,
      token,
      expiresAt: req.body.expiresAt || new Date(Date.now() + 15 * 60 * 1000) // default 15 minutes
    });

    res.status(201).json({
      success: true,
      message: "Access token created",
      data: accessToken
    });
  } catch (error) {
    console.error("Error creating access token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all tokens (admin)
export const getAllAccessTokens = async (req, res) => {
  try {
    const tokens = await AccessToken.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tokens });
  } catch (error) {
    console.error("Error fetching tokens:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get tokens for a user
export const getAccessTokensByUser = async (req, res) => {
  try {
    const tokens = await AccessToken.find({ userId: req.params.userId }).sort({
      createdAt: -1
    });

    res.status(200).json({ success: true, data: tokens });
  } catch (error) {
    console.error("Error fetching user tokens:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Revoke token
export const revokeAccessToken = async (req, res) => {
  try {
    const updated = await AccessToken.findByIdAndUpdate(
      req.params.id,
      {
        isRevoked: true,
        revokedReason: req.body.revokedReason || "manual",
        expiresAt: new Date() // force expire now
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Access token revoked",
      data: updated
    });
  } catch (error) {
    console.error("Error revoking token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete token
export const deleteAccessToken = async (req, res) => {
  try {
    await AccessToken.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Access token deleted"
    });
  } catch (error) {
    console.error("Error deleting token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
