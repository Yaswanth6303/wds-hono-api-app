import type { z } from "zod";
import type { UserTable } from "../db/schema.ts";
import type { createUserSchema, updateUserSchema } from "../validators/user.validator.ts";

export type User = typeof UserTable.$inferSelect;
// What the API returns: never includes the password hash
export type PublicUser = Omit<User, "passwordHash">;
export type NewUser = typeof UserTable.$inferInsert;
export type UserUpdate = Partial<NewUser>;

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
