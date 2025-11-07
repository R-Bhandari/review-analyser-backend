import Feedback from "../models/feedbackModel.js";
import FeedbackResponse from "../models/feedbackResponseModel.js";
import Branch from "../../business/models/branchModel.js";

// ➤ Create Feedback (aggregate all responses)
export const createFeedback = async (req, res) => {
  try {
    const {
      businessId,
      branchId,
      templateId,
      customerName,
      customerPhone,
      responseIds, // Array of FeedbackResponse IDs
    } = req.body;

    // Fetch all related responses
    const responses = await FeedbackResponse.find({ _id: { $in: responseIds } });

    if (!responses || responses.length === 0)
      return res.status(400).json({ success: false, message: "No responses provided" });

    // Compute total and average score
    const totalScore = responses.reduce((sum, r) => sum + (r.selectedOption?.score || 0), 0);
    const avgScore = totalScore / responses.length;

    // Determine sentiment
    let sentiment = "Neutral";
    if (avgScore >= 4.5) sentiment = "Positive";
    else if (avgScore < 3) sentiment = "Negative";

    // Find redirect URL for positive feedback
    let redirectUrl = null;
    if (sentiment === "Positive") {
      const branch = await Branch.findById(branchId);
      redirectUrl = branch?.googleReviewLink || null;
    }

    // Create feedback record
    const feedback = await Feedback.create({
      businessId,
      branchId,
      templateId,
      customerName,
      customerPhone,
      responses: responseIds,
      averageScore: avgScore,
      sentiment,
      redirectUrl,
    });

    // Update all responses to include feedbackId
    await FeedbackResponse.updateMany(
      { _id: { $in: responseIds } },
      { $set: { feedbackId: feedback._id } }
    );

    res.status(201).json({
      success: true,
      message: "Feedback created successfully",
      data: feedback,
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ➤ Get all feedback
export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate("businessId", "name")
      .populate("branchId", "name")
      .populate("templateId", "name")
      .populate("responses");

    res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ➤ Get feedback by ID
export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate("businessId", "name")
      .populate("branchId", "name")
      .populate("templateId", "name")
      .populate({
        path: "responses",
        populate: { path: "questionId", select: "text" },
      });

    if (!feedback)
      return res.status(404).json({ success: false, message: "Feedback not found" });

    res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    console.error("Error fetching feedback by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
