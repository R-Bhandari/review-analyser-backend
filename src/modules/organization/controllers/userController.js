// src/modules/organization/controllers/userController.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Business from "../../business/models/businessModel.js";
import Branch from "../../business/models/branchModel.js";

/**
 * Generate JWT token for a user id.
 * Uses JWT_ACCESS_SECRET if set, otherwise falls back to JWT_SECRET.
 */
const generateToken = (id) => {
  const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || "dev_secret_key";
  // Access token short expiry in prod recommended; here we keep 30d as previously used.
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};

/**
 * Register new user
 * - public endpoint (keeps compatibility with current route design)
 * - prevents public creation of SuperAdmin unless admin signup key matches env ADMIN_SIGNUP_KEY
 * - verifies referenced businessId and branchId exist
 */
export const registerUser = async (req, res, next) => {
  try {
    // sanitize / normalize input
    const name = String(req.body.name).trim();
    const email = String(req.body.email).toLowerCase().trim();
    const password = String(req.body.password);
    const role = req.body.role ? String(req.body.role).trim() : undefined;
    const businessId = req.body.businessId || null;
    const branchId = req.body.branchId || null;
    const adminSignupKey = req.body.adminSignupKey || null; // optional secret for creating platform admins

    // Basic validation (Zod does main validation in route; these are safety checks)
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required" });
    }

    // Role restrictions: prevent public creation of SuperAdmin without secret
    if (role === "SuperAdmin") {
      const envKey = process.env.ADMIN_SIGNUP_KEY || "";
      if (!adminSignupKey || adminSignupKey !== envKey) {
        return res.status(403).json({
          success: false,
          message: "Creating a SuperAdmin via public signup is not allowed. Provide a valid adminSignupKey."
        });
      }
    }

    // Check duplicate email
    const userExists = await User.findOne({ email }).lean();
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists with this email" });
    }

    // Validate provided businessId
    if (businessId) {
      const business = await Business.findById(businessId).lean();
      if (!business) {
        return res.status(400).json({ success: false, message: "Invalid businessId — no matching business found" });
      }
    }

    // Validate provided branchId
    if (branchId) {
      const branch = await Branch.findById(branchId).lean();
      if (!branch) {
        return res.status(400).json({ success: false, message: "Invalid branchId — no matching branch found" });
      }
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "Staff",
      businessId,
      branchId
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    console.error("❌ registerUser error:", error);
    // duplicate key error (email)
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Duplicate email — user already exists" });
    }
    next(error);
  }
};

/**
 * Login user
 * - returns access token and basic user info
 */
export const loginUser = async (req, res, next) => {
  try {
    const email = String(req.body.email || "").toLowerCase().trim();
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    console.error("❌ loginUser error:", error);
    next(error);
  }
};
