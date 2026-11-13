import { z } from "zod";
import { createUserSchema } from "./user.validator.ts";

export const registerSchema = createUserSchema;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});
