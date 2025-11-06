import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
import userRoutes from "./routes/userRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";


app.use("/api/businesses", businessRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/templates", templateRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
