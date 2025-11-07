import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "../");

const oldModels = path.join(rootDir, "models");
const oldControllers = path.join(rootDir, "controllers");
const oldRoutes = path.join(rootDir, "routes");

const modulesDir = path.join(rootDir, "src", "modules");

// Create directories if missing
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

// Move helper
function moveFile(oldPath, newPath) {
  if (fs.existsSync(oldPath)) {
    ensureDir(path.dirname(newPath));
    fs.renameSync(oldPath, newPath);
    console.log(`✅ Moved: ${path.relative(rootDir, oldPath)} → ${path.relative(rootDir, newPath)}`);
  } else {
    console.log(`⚠️ Missing: ${path.relative(rootDir, oldPath)}`);
  }
}

// Define your organization module structure
const organizationModels = ["user", "role", "department"];

organizationModels.forEach((baseName) => {
  const modelFile = `${baseName}Model.js`;
  const controllerFile = `${baseName}Controller.js`;
  const routeFile = `${baseName}Routes.js`;

  const modulePath = path.join(modulesDir, "organization");

  const newModelPath = path.join(modulePath, "models", modelFile);
  const newControllerPath = path.join(modulePath, "controllers", controllerFile);
  const newRoutePath = path.join(modulePath, "routes", routeFile);

  moveFile(path.join(oldModels, modelFile), newModelPath);
  moveFile(path.join(oldControllers, controllerFile), newControllerPath);
  moveFile(path.join(oldRoutes, routeFile), newRoutePath);
});

console.log("\n✅ Organization module migration complete!");
console.log("📁 Check: src/modules/organization/");
