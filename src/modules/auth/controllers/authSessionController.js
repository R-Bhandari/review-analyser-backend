// src/modules/auth/controllers/authSessionController.js

import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AuthSession from "../models/authSessionModel.js";
import RefreshToken from "../models/refreshTokenModel.js";
import User from "../../organization/models/userModel.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/token.js";

import { success, fail } from "../../../utils/response.js";

/* ---------------------------------------------------
   LOGIN USER (JWT + SESSION CREATION)
----------------------------------------------------- */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return fail(res, "Invalid credentials", null, 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return fail(res, "Invalid credentials", null, 401);

    // 1. Generate ACCESS TOKEN
    const accessToken = generateAccessToken({ id: user._id });

    // 2. Generate REFRESH TOKEN
    const refreshToken = generateRefreshToken({ id: user._id });

    // 3. Store refresh token in DB (device tracking)
    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      deviceId: req.headers["user-agent"],
      createdByIp: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userAgent: req.headers["user-agent"],
    });

    // 4. Create session entry
    const session = await AuthSession.create({
      userId: user._id,
      sessionToken: accessToken,
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip,
      isActive: true,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    // 5. Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return success(res, "Login successful", {
      accessToken,
      session,
      user,
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------
   REFRESH ACCESS TOKEN (ROTATION STRATEGY)
----------------------------------------------------- */
export const refreshAccessToken = async (req, res, next) => {
  try {
    const oldToken = req.cookies?.refreshToken;

    if (!oldToken) return fail(res, "Refresh token missing", null, 401);

    let decoded;
    try {
      decoded = jwt.verify(oldToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return fail(res, "Refresh token expired or invalid", null, 401);
    }

    // Check in DB
    const stored = await RefreshToken.findOne({
      token: oldToken,
      revoked: false,
    });

    if (!stored) return fail(res, "Invalid refresh token", null, 401);

    const user = await User.findById(decoded.id).lean();
    if (!user) return fail(res, "User does not exist", null, 401);

    // Issue new tokens (ROTATION)
    const newAccess = generateAccessToken({ id: user._id });
    const newRefresh = generateRefreshToken({ id: user._id });

    // Revoke old token
    stored.revoked = true;
    stored.revokedAt = new Date();
    stored.replacedByToken = newRefresh;
    await stored.save();

    // Save new refresh token
    await RefreshToken.create({
      userId: user._id,
      token: newRefresh,
      deviceId: stored.deviceId,
      createdByIp: req.ip,
      expiresAt: new Date(Date.now() + 7 * 86400000),
      userAgent: req.headers["user-agent"],
    });

    // Update cookie
    res.cookie("refreshToken", newRefresh, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return success(res, "Token refreshed successfully", {
      accessToken: newAccess,
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------------------------------------------
   CREATE SESSION (ADMIN TOOL)
----------------------------------------------------- */
export const createSession = async (req, res) => {
  try {
    const sessionToken = nanoid(32);

    const session = await AuthSession.create({
      ...req.body,
      sessionToken,
      expiresAt:
        req.body.expiresAt ||
        new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return success(res, "Session created", session);
  } catch (error) {
    console.error("Error creating session:", error);
    return fail(res, error.message);
  }
};

/* ---------------------------------------------------
   GET ALL SESSIONS (ADMIN)
----------------------------------------------------- */
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await AuthSession.find().sort({ createdAt: -1 });

    return success(res, "Sessions fetched", sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return fail(res, error.message);
  }
};

/* ---------------------------------------------------
   GET USER SESSIONS
----------------------------------------------------- */
export const getUserSessions = async (req, res) => {
  try {
    const sessions = await AuthSession.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    return success(res, "User sessions fetched", sessions);
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    return fail(res, error.message);
  }
};

/* ---------------------------------------------------
   REVOKE SESSION (LOGOUT)
----------------------------------------------------- */
export const revokeSession = async (req, res) => {
  try {
    const session = await AuthSession.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false,
        logoutTime: new Date(),
        revokedReason: req.body.revokedReason || "manual",
      },
      { new: true }
    );

    return success(res, "Session revoked", session);
  } catch (error) {
    console.error("Error revoking session:", error);
    return fail(res, error.message);
  }
};

/* ---------------------------------------------------
   DELETE SESSION RECORD
----------------------------------------------------- */
export const deleteSession = async (req, res) => {
  try {
    await AuthSession.findByIdAndDelete(req.params.id);

    return success(res, "Session deleted");
  } catch (error) {
    console.error("Error deleting session:", error);
    return fail(res, error.message);
  }
};
