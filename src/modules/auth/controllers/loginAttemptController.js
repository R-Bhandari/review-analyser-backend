import LoginAttempt from "../models/loginAttemptModel.js";

// Record an attempt
export const recordLoginAttempt = async (req, res) => {
  try {
    const attempt = await LoginAttempt.create(req.body);

    res.status(201).json({
      success: true,
      message: "Login attempt recorded",
      data: attempt
    });
  } catch (error) {
    console.error("Error recording login attempt:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get attempts for a user
export const getLoginAttemptsByUser = async (req, res) => {
  try {
    const attempts = await LoginAttempt.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: attempts });
  } catch (error) {
    console.error("Error fetching user login attempts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get attempts by identifier (email/phone)
export const getLoginAttemptsByIdentifier = async (req, res) => {
  try {
    const attempts = await LoginAttempt.find({
      identifier: req.params.identifier
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: attempts });
  } catch (error) {
    console.error("Error fetching login attempts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete attempt
export const deleteLoginAttempt = async (req, res) => {
  try {
    await LoginAttempt.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Login attempt deleted"
    });
  } catch (error) {
    console.error("Error deleting login attempt:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear all attempts for a user
export const clearUserLoginAttempts = async (req, res) => {
  try {
    await LoginAttempt.deleteMany({ userId: req.params.userId });

    res.status(200).json({
      success: true,
      message: "All login attempts cleared for user"
    });
  } catch (error) {
    console.error("Error clearing login attempts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
