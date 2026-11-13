import type { z } from "zod";
import type { loginSchema, registerSchema } from "../validators/auth.validator.ts";
import type { User } from "./user.types.ts";

export type JwtPayload = {
  sub: string;
  role: User["role"];
  exp: number;
};

// Hono context variables set by requireAuth
export type JwtEnv = {
  Variables: { jwtPayload: JwtPayload };
};

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
