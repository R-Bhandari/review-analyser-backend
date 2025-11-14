import { nanoid } from "nanoid";
import AuthSession from "../models/authSessionModel.js";

// Create new session
export const createSession = async (req, res) => {
  try {
    const sessionToken = nanoid(32);

    const session = await AuthSession.create({
      ...req.body,
      sessionToken,
      expiresAt: req.body.expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000) // default 24 hrs
    });

    res.status(201).json({
      success: true,
      message: "Session created",
      data: session
    });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all sessions for admin
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await AuthSession.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get sessions for a user
export const getUserSessions = async (req, res) => {
  try {
    const sessions = await AuthSession.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: sessions });
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Revoke (logout) a session
export const revokeSession = async (req, res) => {
  try {
    const session = await AuthSession.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false,
        logoutTime: new Date(),
        revokedReason: req.body.revokedReason || "manual"
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Session revoked",
      data: session
    });
  } catch (error) {
    console.error("Error revoking session:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete session record
export const deleteSession = async (req, res) => {
  try {
    await AuthSession.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Session deleted"
    });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
