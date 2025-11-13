import UsageLimit from "../models/usageLimitModel.js";

// ➤ Create Usage Limit Record
export const createUsageLimit = async (req, res) => {
  try {
    const usage = await UsageLimit.create(req.body);

    res.status(201).json({
      success: true,
      message: "Usage limit record created successfully",
      data: usage,
    });
  } catch (error) {
    console.error("Error creating usage limit:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get Usage Limits by Subscription
export const getUsageBySubscription = async (req, res) => {
  try {
    const record = await UsageLimit.findOne({
      subscriptionId: req.params.subscriptionId,
    }).populate("planId");

    if (!record)
      return res.status(404).json({ success: false, message: "Usage record not found" });

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error("Error fetching usage record:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Update usage counters
export const updateUsage = async (req, res) => {
  try {
    const updated = await UsageLimit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Usage updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating usage:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete a usage record
export const deleteUsage = async (req, res) => {
  try {
    const deleted = await UsageLimit.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ success: false, message: "Usage record not found" });

    res.status(200).json({ success: true, message: "Usage record deleted successfully" });
  } catch (error) {
    console.error("Error deleting usage:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
