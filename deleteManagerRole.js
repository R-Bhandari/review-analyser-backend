import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "./src/modules/organization/models/roleModel.js";

dotenv.config();

async function deleteManagerRole() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB.");

    const result = await Role.deleteOne({ name: "Manager" });

    if (result.deletedCount === 1) {
      console.log("🗑️ Manager role deleted.");
    } else {
      console.log("⚠️ Manager role not found.");
    }

    process.exit(0);

  } catch (err) {
    console.error("Error deleting role:", err);
    process.exit(1);
  }
}

deleteManagerRole();
