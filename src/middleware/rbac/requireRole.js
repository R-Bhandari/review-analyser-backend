// src/middleware/rbac/requireRole.js
import { fail } from "../../utils/response.js";

export const requireRole = (requiredRole) => {
  return (req, res, next) => {

    if (!req.user) {
      return fail(res, "Unauthorized: user not found in request", null, 401);
    }

    // SuperAdmin bypass
    if (req.user.role === "SuperAdmin") {
      return next();
    }

    // Role check
    if (req.user.role !== requiredRole) {
      return fail(
        res,
        `Access denied: requires role ${requiredRole}`,
        null,
        403
      );
    }

    next();
  };
};
