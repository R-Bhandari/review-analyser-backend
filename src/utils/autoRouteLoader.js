import { glob } from "glob";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Dynamically loads all route files under src/modules/* routes/
 * and registers them on the Express app with intelligent prefixes.
 * 
 * Example: src/modules/ai/routes/autoSummaryRoutes.js
 * → Accessible at: /api/ai/autoSummary
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadAllRoutes(app) {
  const projectRoot = path.resolve(__dirname, "../..");

  // Find all route files under modules
  const routeFiles = await glob("src/modules/**/routes/*Routes.js", {
    cwd: projectRoot,
    absolute: true,
  });

  console.log(`\n📦 Auto-loading ${routeFiles.length} route files...`);

  for (const routeFile of routeFiles) {
    // Extract module and route names from path
    const segments = routeFile.split(path.sep);
    const moduleNameIndex = segments.findIndex((s) => s === "modules") + 1;
    const moduleName = segments[moduleNameIndex];
    const routeFileName = path.basename(routeFile, ".js").replace("Routes", "");

    try {
      const routeModule = (await import(`file://${routeFile}`)).default;

      // Build path: /api/<module>/<routeFileName>
      const basePath = `/api/${moduleName}/${routeFileName}`;
      app.use(basePath, routeModule);

      console.log(`✅ Registered route: ${basePath}`);
    } catch (err) {
      console.error(`❌ Failed to load ${routeFile}:`, err.message);
    }
  }

  console.log("🚀 All routes registered automatically!\n");
}
