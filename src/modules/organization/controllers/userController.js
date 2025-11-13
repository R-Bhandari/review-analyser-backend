import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Business from "../../business/models/businessModel.js";
import Branch from "../../business/models/branchModel.js";

// 🔐 Generate JWT Token
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || "dev_secret_key";
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};

// ➤ Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, businessId, branchId } = req.body;

    // 🧩 Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required fields",
      });
    }

    // 🎯 Role Validation (ADD THIS PART HERE)
    const validRoles = ["SuperAdmin", "Owner", "Manager", "Staff"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role '${role}'. Allowed roles: ${validRoles.join(", ")}`,
      });
    }
    
    // 🧱 Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 🏢 Validate Business (if provided)
    if (businessId) {
      const business = await Business.findById(businessId);
      if (!business) {
        return res.status(400).json({
          success: false,
          message: "Invalid businessId — no matching business found",
        });
      }
    }

    // 🏬 Validate Branch (if provided)
    if (branchId) {
      const branch = await Branch.findById(branchId);
      if (!branch) {
        return res.status(400).json({
          success: false,
          message: "Invalid branchId — no matching branch found",
        });
      }
    }

    // 👤 Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "User",
      businessId: businessId || null,
      branchId: branchId || null,
    });

    // 🟢 Respond success
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error("❌ Error in registerUser:", error.message);

    // Special handling for duplicate key (email)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate email — user already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// ➤ Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🧩 Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 🟢 Respond success
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error("❌ Error in loginUser:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};
