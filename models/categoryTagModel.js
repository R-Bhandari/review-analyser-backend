import mongoose from "mongoose";

const categoryTagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tag name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    color: {
      type: String,
      default: "#2563eb", // default blue color for UI tagging later
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CategoryTag = mongoose.model("CategoryTag", categoryTagSchema);
export default CategoryTag;
