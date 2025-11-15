import Device from "../models/deviceModel.js";

// Register device (first time login on that device)
export const registerDevice = async (req, res) => {
  try {
    const { userId, deviceId } = req.body;

    let device = await Device.findOne({ userId, deviceId });

    if (device) {
      device.lastSeenAt = new Date();
      await device.save();

      return res.status(200).json({
        success: true,
        message: "Device updated",
        data: device
      });
    }

    device = await Device.create({
      ...req.body,
      firstLoginAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: "Device registered",
      data: device
    });
  } catch (error) {
    console.error("Error registering device:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all devices for a user
export const getDevicesByUser = async (req, res) => {
  try {
    const devices = await Device.find({ userId: req.params.userId }).sort({
      lastSeenAt: -1
    });

    res.status(200).json({ success: true, data: devices });
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Disable device
export const disableDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(
      req.params.id,
      {
        disabled: true,
        disabledReason: req.body.disabledReason || "manual"
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Device disabled",
      data: device
    });
  } catch (error) {
    console.error("Error disabling device:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark device as trusted
export const trustDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(
      req.params.id,
      { isTrusted: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Device marked as trusted",
      data: device
    });
  } catch (error) {
    console.error("Error trusting device:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete device
export const deleteDevice = async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Device deleted" });
  } catch (error) {
    console.error("Error deleting device:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
