import ConsentRecord from "../models/consentModel.js";

// Create / record consent
export const createConsent = async (req, res) => {
  try {
    const payload = {
      userId: req.body.userId,
      businessId: req.body.businessId || null,
      consentType: req.body.consentType,
      version: req.body.version,
      accepted: req.body.accepted !== undefined ? req.body.accepted : true,
      acceptedAt: req.body.acceptedAt || new Date(),
      ipAddress: req.body.ipAddress || null,
      userAgent: req.body.userAgent || null,
      metadata: req.body.metadata || {}
    };

    const record = await ConsentRecord.create(payload);

    res.status(201).json({
      success: true,
      message: "Consent recorded",
      data: record
    });
  } catch (error) {
    console.error("Error creating consent record:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all consent records (admin)
export const getAllConsents = async (req, res) => {
  try {
    const records = await ConsentRecord.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    console.error("Error fetching consents:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get consents for a user
export const getUserConsents = async (req, res) => {
  try {
    const records = await ConsentRecord.find({ userId: req.params.userId }).sort({
      createdAt: -1
    });
    res.status(200).json({ success: true, data: records });
  } catch (error) {
    console.error("Error fetching user consents:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get latest consent for a user + type
export const getLatestConsent = async (req, res) => {
  try {
    const { userId, consentType } = req.query;
    const record = await ConsentRecord.findOne({ userId, consentType }).sort({
      acceptedAt: -1
    });
    res.status(200).json({ success: true, data: record || null });
  } catch (error) {
    console.error("Error fetching latest consent:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Withdraw consent
export const withdrawConsent = async (req, res) => {
  try {
    const record = await ConsentRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: "Consent not found" });

    record.withdrawn = true;
    record.withdrawnAt = new Date();
    await record.save();

    res.status(200).json({ success: true, message: "Consent withdrawn", data: record });
  } catch (error) {
    console.error("Error withdrawing consent:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete consent record (admin)
export const deleteConsent = async (req, res) => {
  try {
    await ConsentRecord.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Consent record deleted" });
  } catch (error) {
    console.error("Error deleting consent record:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
