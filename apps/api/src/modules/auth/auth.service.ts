import prisma from "../../config/database";
import { hashPassword, comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";
import {
  ConflictError,
  UnauthorizedError,
  InternalServerError,
} from "../../utils/errors";
import { SignupInput, LoginInput } from "./auth.validation";

export const signup = async (input: SignupInput) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new ConflictError("Email already in use");
  }

  // Hash password
  const hashedPassword = await hashPassword(input.password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
      role: "CUSTOMER",
      customer: {
        create: {},
      },
    },
  });

  // Generate token
  const token = generateToken(user.id, user.email, user.role as "CUSTOMER" | "ADMIN");

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
};

export const login = async (input: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  // Verify password
  const isPasswordValid = await comparePassword(input.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  if (!user.isActive) {
    throw new UnauthorizedError("Account is inactive");
  }

  // Generate token
  const token = generateToken(user.id, user.email, user.role as "CUSTOMER" | "ADMIN");

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
};
