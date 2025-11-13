import MessageTemplate from "../models/messageTemplateModel.js";

// ➤ Create Template
export const createTemplate = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await MessageTemplate.findOne({ name });
    if (exists)
      return res.status(400).json({ success: false, message: "Template name already exists" });

    const template = await MessageTemplate.create(req.body);

    res.status(201).json({
      success: true,
      message: "Template created successfully",
      data: template,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get All Templates
export const getAllTemplates = async (req, res) => {
  try {
    const list = await MessageTemplate.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get Template by ID
export const getTemplateById = async (req, res) => {
  try {
    const template = await MessageTemplate.findById(req.params.id);
    if (!template)
      return res.status(404).json({ success: false, message: "Template not found" });

    res.status(200).json({ success: true, data: template });
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete Template
export const deleteTemplate = async (req, res) => {
  try {
    const template = await MessageTemplate.findByIdAndDelete(req.params.id);
    if (!template)
      return res.status(404).json({ success: false, message: "Template not found" });

    res.status(200).json({ success: true, message: "Template deleted successfully" });
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
