import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: false,
    },
    name: {
      type: String,
      required: [true, "Template name is required"],
      trim: true,
    },
    description: {
      type: String,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    categoryTags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CategoryTag",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);
export default Template;
