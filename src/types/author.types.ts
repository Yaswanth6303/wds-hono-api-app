import type { AuthorTable } from "../db/schema.ts";

export type Author = typeof AuthorTable.$inferSelect;
export type NewAuthor = typeof AuthorTable.$inferInsert;
export type AuthorUpdate = Partial<NewAuthor>;
