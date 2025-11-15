import ErrorLog from "../modules/logs/models/errorLogModel.js";
import mongoose from "mongoose";
import { ZodError } from "zod";

/**
 * Central Error Handler (Express 5 compatible)
 */
export const errorHandler = async (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  // Decide status
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  /**
   * 1. Handle Zod validation errors
   */
  if (err instanceof ZodError) {
    status = 422;
    message = "Validation Failed";
  }

  /**
   * 2. Handle Mongoose validation errors
   */
  if (err instanceof mongoose.Error.ValidationError) {
    status = 422;
    message = "Database Validation Failed";
  }

  /**
   * 3. Handle JWT/Authentication errors
   */
  if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid or malformed token";
  }

  if (err.name === "TokenExpiredError") {
    status = 401;
    message = "Token expired";
  }

  /**
   * 4. Custom errors (throw {status: 404, message: "..."})
   * Already handled because err.status exists
   */

  /**
   * Save error log safely
   */
  try {
    await ErrorLog.create({
      message: err.message,
      stack: err.stack,
      service: "api",
      endpoint: req.originalUrl,
      method: req.method,
      statusCode: status,
      ipAddress: req.ip,
      userId: req.user?._id || null,
      businessId: req.user?.businessId || null,
      severity: status >= 500 ? "high" : "medium",
    });
  } catch (logErr) {
    console.error("❗ Failed to save ErrorLog:", logErr);
  }

  /**
   * Final API response
   */
  res.status(status).json({
    success: false,
    message,
    error:
      process.env.NODE_ENV === "production"
        ? undefined
        : err.stack, // show stack only in dev
  });
};
