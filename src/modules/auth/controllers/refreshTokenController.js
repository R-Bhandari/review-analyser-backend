import { nanoid } from "nanoid";
import RefreshToken from "../models/refreshTokenModel.js";

// Create Refresh Token
export const createRefreshToken = async (req, res) => {
  try {
    const token = `rt_${nanoid(64)}`; // long, secure token

    const refreshToken = await RefreshToken.create({
      ...req.body,
      token,
      expiresAt: req.body.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });

    res.status(201).json({
      success: true,
      message: "Refresh token created",
      data: refreshToken
    });
  } catch (error) {
    console.error("Error creating refresh token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all tokens (admin)
export const getAllRefreshTokens = async (req, res) => {
  try {
    const tokens = await RefreshToken.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tokens });
  } catch (error) {
    console.error("Error fetching refresh tokens:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get tokens for a user
export const getRefreshTokensByUser = async (req, res) => {
  try {
    const tokens = await RefreshToken.find({ userId: req.params.userId }).sort({
      createdAt: -1
    });

    res.status(200).json({ success: true, data: tokens });
  } catch (error) {
    console.error("Error fetching refresh tokens:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Revoke a token
export const revokeRefreshToken = async (req, res) => {
  try {
    const token = await RefreshToken.findById(req.params.id);

    if (!token)
      return res.status(404).json({ success: false, message: "Token not found" });

    token.revoked = true;
    token.revokedAt = new Date();
    token.revokedByIp = req.body.revokedByIp || null;
    await token.save();

    res.status(200).json({
      success: true,
      message: "Refresh token revoked",
      data: token
    });
  } catch (error) {
    console.error("Error revoking refresh token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Refresh Token
export const deleteRefreshToken = async (req, res) => {
  try {
    await RefreshToken.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Refresh token deleted"
    });
  } catch (error) {
    console.error("Error deleting refresh token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
