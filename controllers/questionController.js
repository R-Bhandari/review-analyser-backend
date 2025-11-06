import Question from "../models/questionModel.js";
import Template from "../models/templateModel.js";

// ➤ Create new question
export const createQuestion = async (req, res) => {
  try {
    const { templateId, categoryTag, text, options, order } = req.body;

    // Check template existence
    const templateExists = await Template.findById(templateId);
    if (!templateExists) {
      return res.status(404).json({ success: false, message: "Template not found" });
    }

    // Create question
    const question = await Question.create({
      templateId,
      categoryTag,
      text,
      options,
      order,
    });

    // Add question to template's question list
    templateExists.questions.push(question._id);
    await templateExists.save();

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating question", error: error.message });
  }
};

// ➤ Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("templateId", "name")
      .populate("categoryTag", "name");

    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching questions" });
  }
};

// ➤ Get questions by template
export const getQuestionsByTemplate = async (req, res) => {
  try {
    const questions = await Question.find({ templateId: req.params.templateId })
      .populate("categoryTag", "name");

    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching template questions" });
  }
};

// ➤ Get single question
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("templateId", "name")
      .populate("categoryTag", "name");

    if (!question)
      return res.status(404).json({ success: false, message: "Question not found" });

    res.status(200).json({ success: true, data: question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching question" });
  }
};

// ➤ Delete question
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question)
      return res.status(404).json({ success: false, message: "Question not found" });

    res.status(200).json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting question" });
  }
};
