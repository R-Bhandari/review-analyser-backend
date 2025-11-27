import { z } from "zod";

export const createBusinessSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Business name is required"),
    category: z.string().optional(),
    address: z.string().optional(),
  }),
});
