import type { ApiKeyTable } from "../db/schema.ts";
import type { PublicUser } from "./user.types.ts";

export type ApiKey = typeof ApiKeyTable.$inferSelect;
export type NewApiKey = typeof ApiKeyTable.$inferInsert;

// Hono context variables set by requireApiKey
export type ApiKeyEnv = {
  Variables: { apiKeyUser: PublicUser };
};
