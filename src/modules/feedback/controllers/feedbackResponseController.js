import FeedbackResponse from "../models/feedbackResponseModel.js";
import Question from "../models/questionModel.js";

// ➤ Create new feedback response
export const createFeedbackResponse = async (req, res) => {
  try {
    const { feedbackId, questionId, templateId, businessId, branchId, customerName, selectedOption } = req.body;

    // Validate question
    const questionExists = await Question.findById(questionId);
    if (!questionExists)
      return res.status(404).json({ success: false, message: "Question not found" });

    const response = await FeedbackResponse.create({
      feedbackId,
      questionId,
      templateId,
      businessId,
      branchId,
      customerName,
      selectedOption,
    });

    res.status(201).json({
      success: true,
      message: "Feedback response recorded successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error creating feedback response:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all responses
export const getAllResponses = async (req, res) => {
  try {
    const responses = await FeedbackResponse.find()
      .populate("questionId", "text")
      .populate("templateId", "name")
      .populate("businessId", "name")
      .populate("branchId", "name");

    res.status(200).json({ success: true, data: responses });
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get responses by Feedback ID
export const getResponsesByFeedback = async (req, res) => {
  try {
    const responses = await FeedbackResponse.find({ feedbackId: req.params.feedbackId })
      .populate("questionId", "text");

    res.status(200).json({ success: true, data: responses });
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get responses by Template ID
export const getResponsesByTemplate = async (req, res) => {
  try {
    const responses = await FeedbackResponse.find({ templateId: req.params.templateId })
      .populate("questionId", "text");

    res.status(200).json({ success: true, data: responses });
  } catch (error) {
    console.error("Error fetching responses by template:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
