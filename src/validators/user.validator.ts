import { z } from "zod";

// role is left out on purpose: no one can make themselves ADMIN through the API
export const createUserSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const updateUserSchema = createUserSchema.partial();
