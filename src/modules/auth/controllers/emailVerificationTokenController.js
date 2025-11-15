import { nanoid } from "nanoid";
import EmailVerificationToken from "../models/emailVerificationTokenModel.js";

// Create verification token
export const createEmailVerificationToken = async (req, res) => {
  try {
    const token = `evt_${nanoid(32)}`;

    const record = await EmailVerificationToken.create({
      ...req.body,
      token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes expiry
    });

    // Here you'd email: /verify-email/<token>

    res.status(201).json({
      success: true,
      message: "Email verification token generated",
      data: { token: record.token }
    });
  } catch (error) {
    console.error("Error creating email verification token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify token
export const verifyEmailToken = async (req, res) => {
  try {
    const record = await EmailVerificationToken.findOne({
      token: req.params.token
    });

    if (!record)
      return res.status(404).json({ success: false, message: "Invalid token" });

    if (record.used)
      return res
        .status(400)
        .json({ success: false, message: "Token already used" });

    if (record.expiresAt < new Date())
      return res
        .status(400)
        .json({ success: false, message: "Token expired" });

    // Mark token as used
    record.used = true;
    record.usedAt = new Date();
    await record.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: record
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete token
export const deleteEmailVerificationToken = async (req, res) => {
  try {
    await EmailVerificationToken.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Email verification token deleted"
    });
  } catch (error) {
    console.error("Error deleting token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get tokens for a user (admin)
export const getVerificationTokensByUser = async (req, res) => {
  try {
    const records = await EmailVerificationToken.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: records
    });
  } catch (error) {
    console.error("Error fetching tokens:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
