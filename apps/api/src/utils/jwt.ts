import jwt from "jsonwebtoken";
import { JWTPayload } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";

export const generateToken = (
  userId: string,
  email: string,
  role: "CUSTOMER" | "ADMIN"
): string => {
  return jwt.sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const decodeToken = (token: string): JWTPayload | null => {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
};
