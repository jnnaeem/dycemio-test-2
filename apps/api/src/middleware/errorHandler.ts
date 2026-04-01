import { Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { sendError } from "../utils/response";

export const globalErrorHandler = (
  err: Error | AppError,
  _req: any,
  res: Response,
  _next: NextFunction
) => {
  console.error("[ERROR]", err);

  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message, err.code);
  }

  sendError(res, 500, "Internal Server Error");
};
