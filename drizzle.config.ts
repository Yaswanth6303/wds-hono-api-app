import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env.ts";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    user: env.DB_USER,
    host: env.DB_HOST,
    port: env.PORT,
  },
});
