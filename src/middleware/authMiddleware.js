import jwt from "jsonwebtoken";
import User from "../modules/organization/models/userModel.js";
import Role from "../modules/organization/models/roleModel.js";
import { fail } from "../utils/response.js";

export const verifyAccessToken = async (req, res, next) => {
  try {
    let token;

    // 1. Authorization header
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. Cookie fallback
    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return fail(res, "Access token missing", null, 401);
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // 4. Find user
    const user = await User.findById(decoded.id).lean();

    if (!user) {
      return fail(res, "User not found", null, 401);
    }

    // 5. Load user role + permissions
    const role = await Role.findOne({ name: user.role }).lean();

    if (!role) {
      return fail(res, "User role is invalid", null, 403);
    }

    // 6. Attach enhanced user object to request
    req.user = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: role.name,
      permissions: role.permissions || [],
      businessId: user.businessId || null,
      branchId: user.branchId || null,
    };

    next();
  } catch (err) {
    return next(err);
  }
};
