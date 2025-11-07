import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Business from "../../business/models/businessModel.js";
import Branch from "../../business/models/branchModel.js"; // ✅ fixed path

// 🔐 Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "dev_secret_key", {
    expiresIn: "30d",
  });
};

// ➤ Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, businessId, branchId } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Validate businessId (optional)
    if (businessId) {
      const business = await Business.findById(businessId);
      if (!business)
        return res.status(400).json({ message: "Invalid businessId" });
    }

    // Validate branchId (optional)
    if (branchId) {
      const branch = await Branch.findById(branchId);
      if (!branch)
        return res.status(400).json({ message: "Invalid branchId" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      businessId,
      branchId,
    });

    res.status(201).json({
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
    console.error("❌ Error in registerUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ➤ Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    res.status(200).json({
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
    console.error("❌ Error in loginUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};
