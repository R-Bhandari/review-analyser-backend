import FileStorage from "../models/fileStorageModel.js";

// Upload metadata registration
export const createFileRecord = async (req, res) => {
  try {
    const record = await FileStorage.create(req.body);

    res.status(201).json({
      success: true,
      message: "File record created",
      data: record
    });
  } catch (error) {
    console.error("Error creating file record:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all files
export const getAllFiles = async (req, res) => {
  try {
    const files = await FileStorage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: files });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get files for business
export const getFilesByBusiness = async (req, res) => {
  try {
    const files = await FileStorage.find({
      businessId: req.params.businessId
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: files });
  } catch (error) {
    console.error("Error fetching business files:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single file record
export const getFileById = async (req, res) => {
  try {
    const file = await FileStorage.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    res.status(200).json({ success: true, data: file });
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update metadata
export const updateFileRecord = async (req, res) => {
  try {
    const updated = await FileStorage.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: "File record updated",
      data: updated
    });
  } catch (error) {
    console.error("Error updating file record:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Soft delete file
export const deleteFileRecord = async (req, res) => {
  try {
    await FileStorage.findByIdAndUpdate(req.params.id, { status: "deleted" });

    res.status(200).json({
      success: true,
      message: "File record marked as deleted"
    });
  } catch (error) {
    console.error("Error deleting file record:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
