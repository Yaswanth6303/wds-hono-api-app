import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { UserTable } from "../db/schema.ts";

import type { NewUser, UserUpdate } from "../types/user.types.ts";

// Never select passwordHash unless a caller explicitly needs it (login)
const publicColumns = {
  id: UserTable.id,
  email: UserTable.email,
  role: UserTable.role,
  createdAt: UserTable.createdAt,
};

export const findAll = () => db.select(publicColumns).from(UserTable);

export const findById = async (id: string) => {
  const [user] = await db
    .select(publicColumns)
    .from(UserTable)
    .where(eq(UserTable.id, id));
  return user;
};

export const findByEmailWithPassword = (email: string) =>
  db.query.UserTable.findFirst({ where: { email } });

export const insert = async (data: NewUser) => {
  const [user] = await db.insert(UserTable).values(data).returning(publicColumns);
  return user;
};

export const update = async (id: string, data: UserUpdate) => {
  const [user] = await db
    .update(UserTable)
    .set(data)
    .where(eq(UserTable.id, id))
    .returning(publicColumns);
  return user;
};

export const remove = async (id: string) => {
  const [user] = await db
    .delete(UserTable)
    .where(eq(UserTable.id, id))
    .returning(publicColumns);
  return user;
};
