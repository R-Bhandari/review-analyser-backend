import RevokedToken from "../models/revokedTokenModel.js";

// Revoke token
export const revokeToken = async (req, res) => {
  try {
    const record = await RevokedToken.create({
      ...req.body,
      expiresAt: req.body.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    res.status(201).json({
      success: true,
      message: "Token revoked",
      data: record
    });
  } catch (error) {
    console.error("Error revoking token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Check if token is revoked
export const checkTokenRevoked = async (req, res) => {
  try {
    const record = await RevokedToken.findOne({ token: req.params.token });

    if (!record)
      return res.status(200).json({ success: true, revoked: false });

    return res.status(200).json({
      success: true,
      revoked: true,
      data: record
    });
  } catch (error) {
    console.error("Error checking revoked token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get revoked tokens for a user
export const getRevokedTokensByUser = async (req, res) => {
  try {
    const records = await RevokedToken.find({ userId: req.params.userId }).sort({
      createdAt: -1
    });

    res.status(200).json({ success: true, data: records });
  } catch (error) {
    console.error("Error fetching revoked tokens:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete revoked token
export const deleteRevokedToken = async (req, res) => {
  try {
    await RevokedToken.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Revoked token deleted"
    });
  } catch (error) {
    console.error("Error deleting revoked token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
