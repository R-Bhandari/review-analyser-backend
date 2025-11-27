import { ZodError } from "zod";
import { fail } from "../utils/response.js";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return fail(res, "Validation failed", err.errors, 400);
    }
    next(err);
  }
};
