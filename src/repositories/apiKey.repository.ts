import { and, eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { ApiKeyTable } from "../db/schema.ts";

import type { NewApiKey } from "../types/apiKey.types.ts";

// Never return keyHash
const publicColumns = {
  id: ApiKeyTable.id,
  name: ApiKeyTable.name,
  keyPrefix: ApiKeyTable.keyPrefix,
  createdAt: ApiKeyTable.createdAt,
};

export const findAllByUser = (userId: string) =>
  db
    .select(publicColumns)
    .from(ApiKeyTable)
    .where(eq(ApiKeyTable.userId, userId));

export const findByHashWithUser = (keyHash: string) =>
  db.query.ApiKeyTable.findFirst({
    where: { keyHash },
    with: { user: { columns: { passwordHash: false } } },
  });

export const insert = async (data: NewApiKey) => {
  const [apiKey] = await db
    .insert(ApiKeyTable)
    .values(data)
    .returning(publicColumns);
  return apiKey;
};

// Scoped by userId so users can only delete their own keys
export const removeForUser = async (id: string, userId: string) => {
  const [apiKey] = await db
    .delete(ApiKeyTable)
    .where(and(eq(ApiKeyTable.id, id), eq(ApiKeyTable.userId, userId)))
    .returning(publicColumns);
  return apiKey;
};
