import ErrorLog from "../models/errorLogModel.js";

export const errorHandler = async (err, req, res, next) => {
  console.error("Server Error:", err);

  // Save error log
  await ErrorLog.create({
    message: err.message,
    stack: err.stack,
    service: "api",
    endpoint: req.originalUrl,
    method: req.method,
    statusCode: res.statusCode || 500,
    ipAddress: req.ip,
    userId: req.user?._id,
    businessId: req.user?.businessId,
    severity: "high"
  });

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message
  });
};
