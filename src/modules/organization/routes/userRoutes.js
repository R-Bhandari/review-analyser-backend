// src/modules/organization/routes/userRoutes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { validate } from "../../../middleware/validate.js";
import { registerUserSchema, loginUserSchema } from "../validation/userValidation.js";

const router = express.Router();

/**
 * Public: register
 * NOTE: Register remains public for now (customers + admins).
 * Creating SuperAdmin requires adminSignupKey (env ADMIN_SIGNUP_KEY).
 */
router.post("/register", validate(registerUserSchema), registerUser);

/**
 * Public: login
 */
router.post("/login", validate(loginUserSchema), loginUser);

export default router;
