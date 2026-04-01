import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { verifyToken } from "../utils/jwt";
import { UnauthorizedError, ForbiddenError } from "../utils/errors";

export const authenticate = (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    req.user = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }
    throw new UnauthorizedError("Invalid token");
  }
};

export const authorizeAdmin = (req: AuthRequest, _res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new UnauthorizedError("Authentication required");
  }

  if (req.user.role !== "ADMIN") {
    throw new ForbiddenError("Admin access required");
  }

  next();
};
