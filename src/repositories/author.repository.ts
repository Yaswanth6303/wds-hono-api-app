import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { AuthorTable } from "../db/schema.ts";

import type { AuthorUpdate, NewAuthor } from "../types/author.types.ts";

export const findAll = () => db.query.AuthorTable.findMany();

export const findById = (id: string) =>
  db.query.AuthorTable.findFirst({ where: { id } });

export const insert = async (data: NewAuthor) => {
  // This takes the first element from the returned array.
  const [author] = await db.insert(AuthorTable).values(data).returning();
  return author;
};

export const update = async (id: string, data: AuthorUpdate) => {
  const [author] = await db
    .update(AuthorTable)
    .set(data)
    .where(eq(AuthorTable.id, id))
    .returning();
  return author;
};

export const remove = async (id: string) => {
  const [author] = await db
    .delete(AuthorTable)
    .where(eq(AuthorTable.id, id))
    .returning();
  return author;
};
