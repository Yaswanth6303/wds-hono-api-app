import type { ErrorHandler, NotFoundHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppError } from "./app.error.ts";

const PG_UNIQUE_VIOLATION = "23505";

// Drizzle wraps driver errors, so the Postgres code can be on the error or its cause
const pgErrorCode = (err: unknown): string | undefined => {
  for (let e = err; e instanceof Error; e = e.cause) {
    if ("code" in e && typeof e.code === "string") return e.code;
  }
  return undefined;
};

export const errorHandler: ErrorHandler = (err, c) => {
  if (err instanceof AppError) {
    return c.json({ error: err.message }, err.status);
  }
  // Thrown by Hono itself, e.g. the jwt middleware (401) or malformed JSON bodies (400)
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }
  // Backstop for races the services' own checks can't catch (e.g. two signups with one email)
  if (pgErrorCode(err) === PG_UNIQUE_VIOLATION) {
    return c.json({ error: "Resource already exists" }, 409);
  }
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
};

export const notFoundHandler: NotFoundHandler = (c) =>
  c.json({ error: `Route ${c.req.method} ${c.req.path} not found` }, 404);
