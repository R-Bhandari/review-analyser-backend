import WebhookEvent from "../models/webhookEventModel.js";

// Record a new webhook (called by webhook endpoints)
export const createWebhookEvent = async (req, res) => {
  try {
    const data = {
      source: req.body.source,
      eventId: req.body.eventId,
      eventType: req.body.eventType,
      payload: req.body.payload,
      idempotencyKey: req.body.idempotencyKey
    };

    const event = await WebhookEvent.create(data);

    res.status(201).json({
      success: true,
      message: "Webhook event logged",
      data: event
    });
  } catch (error) {
    console.error("Error logging webhook event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all webhook events
export const getAllWebhookEvents = async (req, res) => {
  try {
    const events = await WebhookEvent.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error("Error fetching webhook events:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch a single event
export const getWebhookEventById = async (req, res) => {
  try {
    const event = await WebhookEvent.findById(req.params.id);
    if (!event)
      return res.status(404).json({ success: false, message: "Event not found" });

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error("Error fetching webhook event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update status after processing
export const updateWebhookProcessingStatus = async (req, res) => {
  try {
    const updated = await WebhookEvent.findByIdAndUpdate(
      req.params.id,
      {
        processingStatus: req.body.processingStatus,
        errorMessage: req.body.errorMessage,
        attempts: req.body.attempts,
        lastAttemptAt: Date.now()
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Webhook processing status updated",
      data: updated
    });
  } catch (error) {
    console.error("Error updating webhook event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
