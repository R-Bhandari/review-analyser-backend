import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root = one level up from /scripts/
const rootDir = path.resolve(__dirname, "../");

// Old directories
const oldModels = path.join(rootDir, "models");
const oldControllers = path.join(rootDir, "controllers");
const oldRoutes = path.join(rootDir, "routes");

// New base directory
const srcDir = path.join(rootDir, "src");
const modulesDir = path.join(srcDir, "modules");

// Define where each model set should go
const moduleMap = {
  business: ["business", "branch"],
  feedback: [
    "template",
    "question",
    "feedback",
    "feedbackResponse",
    "sentimentSummary",
    "categoryTag",
  ],
  analytics: [
    "analyticsSummary",
    "tagAnalytics",
    "trendRecord",
    "analyticsCache",
    "keywordCluster",
  ],
  ai: [
    "aiConfig",
    "autoSummary",
    "trendInsight",
    "aiRequestLog",
    "aiSummaryQueue",
    "responseTraining",
  ],
  automation: ["automationJob"],
  reports: ["reportRecord"],
};

// Helper: create directories recursively
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

// Helper: safely move files
function moveFile(oldPath, newPath) {
  if (fs.existsSync(oldPath)) {
    ensureDir(path.dirname(newPath));
    fs.renameSync(oldPath, newPath);
    console.log(`✅ Moved: ${path.relative(rootDir, oldPath)} → ${path.relative(rootDir, newPath)}`);
  } else {
    console.log(`⚠️ Missing: ${path.relative(rootDir, oldPath)}`);
  }
}

// Start migration
console.log("🚀 Starting modular refactor...\n");

for (const [module, models] of Object.entries(moduleMap)) {
  models.forEach((baseName) => {
    const modelFile = `${baseName}Model.js`;
    const controllerFile = `${baseName}Controller.js`;
    const routeFile = `${baseName}Routes.js`;

    const moduleBasePath = path.join(modulesDir, module);
    const newModelPath = path.join(moduleBasePath, "models", modelFile);
    const newControllerPath = path.join(moduleBasePath, "controllers", controllerFile);
    const newRoutePath = path.join(moduleBasePath, "routes", routeFile);

    moveFile(path.join(oldModels, modelFile), newModelPath);
    moveFile(path.join(oldControllers, controllerFile), newControllerPath);
    moveFile(path.join(oldRoutes, routeFile), newRoutePath);
  });
}

// Final console summary
console.log("\n✅ Refactor complete!");
console.log("📁 Verify your new structure under: src/modules/");
console.log("🧩 You can now update your imports in server.js to use @modules/* paths.");
