import { nanoid } from "nanoid";
import PasswordResetToken from "../models/passwordResetTokenModel.js";

// Generate password reset token
export const createResetToken = async (req, res) => {
  try {
    const token = `prt_${nanoid(32)}`;

    const resetToken = await PasswordResetToken.create({
      ...req.body,
      token,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiry
    });

    // Here: send reset link via email
    // Example: https://yourdomain/reset-password/${token}

    res.status(201).json({
      success: true,
      message: "Password reset token generated",
      data: {
        id: resetToken._id,
        token: resetToken.token // hide in prod
      }
    });
  } catch (error) {
    console.error("Error creating reset token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify token before allowing password reset
export const verifyResetToken = async (req, res) => {
  try {
    const tokenRecord = await PasswordResetToken.findOne({
      token: req.params.token
    });

    if (!tokenRecord)
      return res.status(404).json({ success: false, message: "Invalid token" });

    if (tokenRecord.used)
      return res.status(400).json({ success: false, message: "Token already used" });

    if (tokenRecord.expiresAt < new Date())
      return res.status(400).json({ success: false, message: "Token expired" });

    res.status(200).json({
      success: true,
      message: "Token is valid",
      data: tokenRecord
    });
  } catch (error) {
    console.error("Error verifying reset token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark token as used
export const markTokenUsed = async (req, res) => {
  try {
    const updated = await PasswordResetToken.findByIdAndUpdate(
      req.params.id,
      {
        used: true,
        usedAt: new Date()
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Token marked as used",
      data: updated
    });
  } catch (error) {
    console.error("Error marking token used:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete token
export const deleteResetToken = async (req, res) => {
  try {
    await PasswordResetToken.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Password reset token deleted"
    });
  } catch (error) {
    console.error("Error deleting reset token:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
