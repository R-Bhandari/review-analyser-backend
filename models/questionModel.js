import mongoose from "mongoose";

// Subdocument schema for multiple-choice options
const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Option text is required"],
    trim: true,
  },
  sentiment: {
    type: String,
    enum: ["Positive", "Neutral", "Negative"],
    required: [true, "Sentiment type is required"],
  },
  score: {
    type: Number,
    required: [true, "Score is required"],
    min: 1,
    max: 5,
  },
});

// Main Question schema
const questionSchema = new mongoose.Schema(
  {
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    categoryTag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryTag",
    },
    text: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    options: {
      type: [optionSchema],
      validate: {
        validator: function (arr) {
          return arr.length >= 2 && arr.length <= 6;
        },
        message: "Each question must have between 2 and 6 options",
      },
    },
    order: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
