import Notification from "../models/notificationModel.js";

// ➤ Create Notification
export const createNotification = async (req, res) => {
  try {
    const data = req.body;
    const notification = await Notification.create(data);

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get notification by ID
export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification)
      return res.status(404).json({ success: false, message: "Notification not found" });

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification)
      return res.status(404).json({ success: false, message: "Notification not found" });

    res.status(200).json({ success: true, message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
