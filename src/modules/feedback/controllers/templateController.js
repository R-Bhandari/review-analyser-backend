import Template from "../models/templateModel.js";
import Question from "../models/questionModel.js";

// ➤ Create new template
export const createTemplate = async (req, res) => {
  try {
    const { businessId, branchId, name, description, questions, categoryTags, createdBy } = req.body;

    // Create template
    const template = await Template.create({
      businessId,
      branchId,
      name,
      description,
      questions,
      categoryTags,
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: "Template created successfully",
      data: template,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating template", error: error.message });
  }
};

// ➤ Get all templates
export const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find()
      .populate("businessId", "name")
      .populate("branchId", "name")
      .populate("questions", "text")
      .populate("categoryTags", "name");

    res.status(200).json({ success: true, data: templates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching templates" });
  }
};

// ➤ Get a template by ID
export const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id)
      .populate("businessId", "name")
      .populate("branchId", "name")
      .populate("questions")
      .populate("categoryTags", "name");

    if (!template)
      return res.status(404).json({ success: false, message: "Template not found" });

    res.status(200).json({ success: true, data: template });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching template" });
  }
};

// ➤ Delete template
export const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);

    if (!template)
      return res.status(404).json({ success: false, message: "Template not found" });

    res.status(200).json({ success: true, message: "Template deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting template" });
  }
};
