import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Business email is required"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
      default: "India",
    },
    googleReviewLink: {
      type: String,
      required: false, // Optional but useful for redirection
    },
    plan: {
      type: String,
      enum: ["basic", "pro", "enterprise"],
      default: "basic",
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "active",
    },
    subscriptionStart: {
      type: Date,
      default: Date.now,
    },
    subscriptionEnd: {
      type: Date,
      required: false,
    },
    referralCode: {
      type: String,
      unique: true,
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

const Business = mongoose.model("Business", businessSchema);
export default Business;
