import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { loadAllRoutes } from "./src/utils/autoRouteLoader.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Auto-load all routes dynamically
await loadAllRoutes(app);

// Routes
// import userRoutes from "./routes/userRoutes.js";
// import businessRoutes from "./routes/businessRoutes.js";
// import branchRoutes from "./routes/branchRoutes.js";
// import roleRoutes from "./routes/roleRoutes.js";
// import departmentRoutes from "./routes/departmentRoutes.js";
// import templateRoutes from "./routes/templateRoutes.js";
// import questionRoutes from "./routes/questionRoutes.js";
// import feedbackResponseRoutes from "./routes/feedbackResponseRoutes.js";
// import feedbackRoutes from "./routes/feedbackRoutes.js";
// import sentimentSummaryRoutes from "./routes/sentimentSummaryRoutes.js";
// import categoryTagRoutes from "./routes/categoryTagRoutes.js";
// import analyticsSummaryRoutes from "./routes/analyticsSummaryRoutes.js";
// import tagAnalyticsRoutes from "./routes/tagAnalyticsRoutes.js";
// import trendRecordRoutes from "./routes/trendRecordRoutes.js";
// import analyticsCacheRoutes from "./routes/analyticsCacheRoutes.js";
// import keywordClusterRoutes from "./routes/keywordClusterRoutes.js";
// import aiConfigRoutes from "./routes/aiConfigRoutes.js";
// import autoSummaryRoutes from "./routes/autoSummaryRoutes.js";
// import trendInsightRoutes from "./routes/trendInsightRoutes.js";
// import aiRequestLogRoutes from "./routes/aiRequestLogRoutes.js";
// import aiSummaryQueueRoutes from "./routes/aiSummaryQueueRoutes.js";
// import responseTrainingRoutes from "./routes/responseTrainingRoutes.js";
// import automationJobRoutes from "./routes/automationJobRoutes.js";
// import reportRecordRoutes from "./routes/reportRecordRoutes.js";




// app.use("/api/businesses", businessRoutes);
// app.use("/api/branches", branchRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/roles", roleRoutes);
// app.use("/api/departments", departmentRoutes);
// app.use("/api/templates", templateRoutes);
// app.use("/api/questions", questionRoutes);
// app.use("/api/feedback-responses", feedbackResponseRoutes);
// app.use("/api/feedback", feedbackRoutes);
// app.use("/api/summaries", sentimentSummaryRoutes);
// app.use("/api/tags", categoryTagRoutes);
// app.use("/api/analytics-summary", analyticsSummaryRoutes);
// app.use("/api/tag-analytics", tagAnalyticsRoutes);
// app.use("/api/trend-records", trendRecordRoutes);
// app.use("/api/analytics-cache", analyticsCacheRoutes);
// app.use("/api/keyword-clusters", keywordClusterRoutes);
// app.use("/api/ai-config", aiConfigRoutes);
// app.use("/api/auto-summary", autoSummaryRoutes);
// app.use("/api/trend-insights", trendInsightRoutes);
// app.use("/api/ai-request-logs", aiRequestLogRoutes);
// app.use("/api/ai-summary-queue", aiSummaryQueueRoutes);
// app.use("/api/response-training", responseTrainingRoutes);
// app.use("/api/automation-jobs", automationJobRoutes);
// app.use("/api/report-records", reportRecordRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
