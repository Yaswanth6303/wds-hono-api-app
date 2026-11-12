import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z.string().min(1),
  birthday: z.coerce.date().optional(),
});

export const updateAuthorSchema = z.object({
  name: z.string().min(1).optional(),
  // nullable because can keep null for birthday
  birthday: z.coerce.date().optional().nullable(),
});
