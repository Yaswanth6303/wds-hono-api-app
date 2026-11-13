import { sign } from "hono/jwt";
import { env } from "../config/env.ts";
import * as userService from "./user.service.ts";
import { verifyPassword } from "../utils/password.ts";
import { UnauthorizedError } from "../errors/app.error.ts";
import type {
  JwtPayload,
  LoginInput,
  RegisterInput,
} from "../types/auth.types.ts";
import type { User } from "../types/user.types.ts";

const TOKEN_TTL_SECONDS = 60 * 60 * 24; // 1 day

const issueToken = (user: Pick<User, "id" | "role">) => {
  const payload: JwtPayload = {
    sub: user.id,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  };
  return sign(payload, env.JWT_SECRET, "HS256");
};

// Throws ConflictError when the email is already taken
export const register = async (input: RegisterInput) => {
  const user = await userService.createUser(input);
  return {
    user,
    token: await issueToken(user),
  };
};

// Same error for a wrong email or password, so emails can't be probed
export const login = async ({ email, password }: LoginInput) => {
  const found = await userService.getUserByEmailWithPassword(email);
  if (!found || !(await verifyPassword(password, found.passwordHash))) {
    throw new UnauthorizedError("Invalid email or password");
  }
  const { passwordHash: _, ...user } = found;
  return { user, token: await issueToken(user) };
};
