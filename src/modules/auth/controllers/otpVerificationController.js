import { nanoid } from "nanoid";
import OTPVerification from "../models/otpVerificationModel.js";

// Generate OTP (create entry)
export const generateOtp = async (req, res) => {
  try {
    const { identifier, purpose, channel } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpRecord = await OTPVerification.create({
      ...req.body,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000) // expires in 5 min
    });

    // Here: Send OTP using SMS/Email/WhatsApp services

    res.status(201).json({
      success: true,
      message: "OTP generated",
      data: { otpId: otpRecord._id, otp } // remove OTP in production
    });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    const record = await OTPVerification.findById(req.params.id);

    if (!record)
      return res.status(404).json({ success: false, message: "OTP record not found" });

    if (record.verified)
      return res.status(400).json({ success: false, message: "OTP already used" });

    if (record.expiresAt < new Date())
      return res.status(400).json({ success: false, message: "OTP expired" });

    if (record.attempts >= record.maxAttempts)
      return res
        .status(429)
        .json({ success: false, message: "Maximum attempts exceeded" });

    record.attempts += 1;

    if (otp !== record.otp) {
      await record.save();
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    record.verified = true;
    record.verifiedAt = new Date();
    await record.save();

    res.status(200).json({
      success: true,
      message: "OTP verified",
      data: record
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete OTP record
export const deleteOtp = async (req, res) => {
  try {
    await OTPVerification.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "OTP record deleted" });
  } catch (error) {
    console.error("Error deleting OTP:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
