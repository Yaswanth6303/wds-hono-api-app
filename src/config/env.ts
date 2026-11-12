import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),

  DB_PASSWORD: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive(),
});

export const env = envSchema.parse(process.env);
