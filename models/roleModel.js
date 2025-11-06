import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    permissions: {
      type: [String],
      default: [],
      // Example permissions: ["manage_business", "manage_branches", "view_feedback"]
    },
    level: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4], // Hierarchical levels (1 = SuperAdmin)
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);
export default Role;
