import { nanoid } from "nanoid";
import MFADevice from "../models/mfaDeviceModel.js";

// Register MFA device (TOTP or SMS)
export const registerMfaDevice = async (req, res) => {
  try {
    let secret = null;

    if (req.body.type === "totp") {
      secret = nanoid(32); // In production: generate a real TOTP secret
    }

    const device = await MFADevice.create({
      ...req.body,
      secret
    });

    res.status(201).json({
      success: true,
      message: "MFA device registered",
      data: device
    });
  } catch (error) {
    console.error("Error registering MFA device:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify MFA device (e.g., user enters TOTP code)
export const verifyMfaDevice = async (req, res) => {
  try {
    const device = await MFADevice.findById(req.params.id);

    if (!device)
      return res.status(404).json({ success: false, message: "Device not found" });

    // In production, validate TOTP code here using the secret & time window
    device.verified = true;
    device.enabled = true;
    device.verifiedAt = new Date();
    await device.save();

    res.status(200).json({
      success: true,
      message: "MFA device verified",
      data: device
    });
  } catch (error) {
    console.error("Error verifying MFA device:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Generate backup codes
export const generateBackupCodes = async (req, res) => {
  try {
    const codes = Array.from({ length: 10 }).map(() => nanoid(10));

    const device = await MFADevice.create({
      userId: req.body.userId,
      type: "backup_codes",
      backupCodes: codes
    });

    res.status(201).json({
      success: true,
      message: "Backup codes generated",
      data: { id: device._id, codes }
    });
  } catch (error) {
    console.error("Error generating backup codes:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's MFA devices
export const getUserMfaDevices = async (req, res) => {
  try {
    const devices = await MFADevice.find({ userId: req.params.userId }).sort({
      createdAt: -1
    });

    res.status(200).json({ success: true, data: devices });
  } catch (error) {
    console.error("Error fetching MFA devices:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Disable MFA device
export const disableMfaDevice = async (req, res) => {
  try {
    const device = await MFADevice.findByIdAndUpdate(
      req.params.id,
      { enabled: false },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "MFA device disabled",
      data: device
    });
  } catch (error) {
    console.error("Error disabling MFA device:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete MFA device
export const deleteMfaDevice = async (req, res) => {
  try {
    await MFADevice.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "MFA device deleted"
    });
  } catch (error) {
    console.error("Error deleting MFA device:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
