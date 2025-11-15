// seedRoles.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "./src/modules/organization/models/roleModel.js"; 

dotenv.config();

// ---------------------------------------------
// 1. DEFINE ALL PERMISSIONS
// ---------------------------------------------
const PERMISSIONS = [
  "business.manage",
  "feedback.manage",
  "analytics.view",
  "task.manage",
  "billing.manage",
  "referral.manage",
  "dashboard.manage",
  "integrations.manage",
  "settings.manage"
];

// ---------------------------------------------
// 2. ROLE DEFINITIONS
// ---------------------------------------------
const ROLE_DATA = [
  {
    name: "SuperAdmin",
    description: "Platform-level admin (you). Full unrestricted access.",
    permissions: PERMISSIONS,        // ALL permissions
    level: 1,
    isDefault: false                 // platform-only
  },
  {
    name: "Owner",
    description: "Business owner with full access inside their own business.",
    permissions: [
      "business.manage",
      "feedback.manage",
      "analytics.view",
      "task.manage",
      "billing.manage",
      "referral.manage",
      "dashboard.manage",
      "settings.manage"
      // does NOT include integrations.manage
    ],
    level: 2,
    isDefault: true
  },
  {
    name: "Manager",
    description: "Branch manager with limited access.",
    permissions: [
      "feedback.manage",
      "analytics.view",
      "task.manage"
    ],
    level: 3,
    isDefault: false
  },
  {
    name: "Staff",
    description: "Basic staff role with limited task rights.",
    permissions: [
      "task.manage"
    ],
    level: 4,
    isDefault: false
  }
];

// ---------------------------------------------
// 3. MAIN FUNCTION — INSERT ROLES
// ---------------------------------------------
async function seedRoles() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected.");

    for (const role of ROLE_DATA) {
      const existing = await Role.findOne({ name: role.name });

      if (existing) {
        console.log(`⚠️  ${role.name} already exists. Skipping.`);
        continue;
      }

      await Role.create(role);
      console.log(`✅ Created role: ${role.name}`);
    }

    console.log("\n🎉 Role seeding completed successfully.");
    process.exit(0);

  } catch (err) {
    console.error("❌ Error seeding roles:", err);
    process.exit(1);
  }
}

seedRoles();
