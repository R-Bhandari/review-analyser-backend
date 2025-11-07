import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: false, // Optional – only for multi-branch businesses
    },
    name: {
      type: String,
      required: [true, "Department name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    head: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Department Head (Manager)
      required: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;
