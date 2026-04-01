import { Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { signupSchema, loginSchema } from "./auth.validation";
import { signup, login } from "./auth.service";
import { sendSuccess, sendError } from "../../utils/response";
import { BadRequestError } from "../../utils/errors";

export const signupController = asyncHandler(async (req, res, next) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    throw new BadRequestError(result.error.issues[0].message);
  }

  const data = await signup(result.data);
  sendSuccess(res, 201, data, "Signup successful");
});

export const loginController = asyncHandler(async (req, res, next) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    throw new BadRequestError(result.error.issues[0].message);
  }

  const data = await login(result.data);
  sendSuccess(res, 200, data, "Login successful");
});
