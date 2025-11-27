// src/modules/organization/validation/userValidation.js
import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["SuperAdmin", "Owner", "Manager", "Staff"]).optional(),
    businessId: z.string().optional().nullable(),
    branchId: z.string().optional().nullable(),
    // If you want to allow safe public admin signup you must set ADMIN_SIGNUP_KEY env and pass the key here
    adminSignupKey: z.string().optional()
  })
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required")
  })
});
