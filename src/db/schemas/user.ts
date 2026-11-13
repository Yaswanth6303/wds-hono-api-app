import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { userRoleEnum } from "./enums.ts";

export const UserTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  passwordHash: text().notNull(),
  role: userRoleEnum().notNull().default("USER"),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
