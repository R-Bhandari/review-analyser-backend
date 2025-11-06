import CategoryTag from "../models/categoryTagModel.js";

// ➤ Create Tag
export const createTag = async (req, res) => {
  try {
    const { name, description, color, createdBy } = req.body;

    const existingTag = await CategoryTag.findOne({ name });
    if (existingTag)
      return res.status(400).json({ success: false, message: "Tag already exists" });

    const tag = await CategoryTag.create({ name, description, color, createdBy });

    res.status(201).json({
      success: true,
      message: "Tag created successfully",
      data: tag,
    });
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all tags
export const getAllTags = async (req, res) => {
  try {
    const tags = await CategoryTag.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json({ success: true, data: tags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get tag by ID
export const getTagById = async (req, res) => {
  try {
    const tag = await CategoryTag.findById(req.params.id);
    if (!tag)
      return res.status(404).json({ success: false, message: "Tag not found" });

    res.status(200).json({ success: true, data: tag });
  } catch (error) {
    console.error("Error fetching tag:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Delete tag
export const deleteTag = async (req, res) => {
  try {
    const tag = await CategoryTag.findByIdAndDelete(req.params.id);
    if (!tag)
      return res.status(404).json({ success: false, message: "Tag not found" });

    res.status(200).json({ success: true, message: "Tag deleted successfully" });
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
