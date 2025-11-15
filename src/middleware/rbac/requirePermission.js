// src/middleware/rbac/requirePermission.js
import { fail } from "../../utils/response.js";

export const requirePermission = (permission) => {
  return (req, res, next) => {

    if (!req.user) {
      return fail(res, "Unauthorized: user not found in request", null, 401);
    }

    // SuperAdmin bypass
    if (req.user.role === "SuperAdmin") {
      return next();
    }

    // Permission check
    if (!req.user.permissions || !req.user.permissions.includes(permission)) {
      return fail(
        res,
        `Access denied: requires permission ${permission}`,
        null,
        403
      );
    }

    next();
  };
};
