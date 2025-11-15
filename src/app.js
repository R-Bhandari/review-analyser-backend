import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { apiLogger } from "./middleware/apiLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimiter.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// -------------------------------------------------
// CORE MIDDLEWARE
// -------------------------------------------------
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// -------------------------------------------------
// GLOBAL RATE LIMITING (optional)
// -------------------------------------------------
if (apiLimiter) app.use(apiLimiter);

// -------------------------------------------------
// API LOGGING
// -------------------------------------------------
app.use(apiLogger);

// -------------------------------------------------
// ROUTES AUTO-LOADER (Async Safe)
// -------------------------------------------------
const modulesPath = path.join(__dirname, "modules");

(async () => {
  try {
    const moduleFolders = fs.readdirSync(modulesPath);

    for (const moduleName of moduleFolders) {
      const routesPath = path.join(modulesPath, moduleName, "routes");
      const indexFile = path.join(routesPath, "index.js");

      if (fs.existsSync(indexFile)) {
        const routeModule = await import(indexFile);

        app.use(`/api/${moduleName}`, routeModule.default);
        console.log(`➡ Loaded routes for module: ${moduleName}`);
      }
    }
  } catch (err) {
    console.error("❌ Error loading routes:", err);
  }
})();

// -------------------------------------------------
// HEALTH CHECK
// -------------------------------------------------
app.get("/health", (req, res) => {
  res.json({ success: true, message: "OK" });
});

// -------------------------------------------------
// ERROR HANDLER (must be LAST middleware)
// -------------------------------------------------
app.use(errorHandler);

export default app;
