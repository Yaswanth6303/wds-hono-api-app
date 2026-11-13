import { createMiddleware } from "hono/factory";
import * as apiKeyService from "../services/apiKey.service.ts";
import { UnauthorizedError } from "../errors/app.error.ts";
import type { ApiKeyEnv } from "../types/apiKey.types.ts";

// Use on any route: app.get("/x", requireApiKey, (c) => c.get("apiKeyUser")) -> Tested in user routes = Get all the users
export const requireApiKey = createMiddleware<ApiKeyEnv>(async (c, next) => {
  const key = c.req.header("x-api-key");
  const user = key ? await apiKeyService.verifyApiKey(key) : null;
  if (!user) throw new UnauthorizedError("Invalid or missing API key");
  c.set("apiKeyUser", user);
  await next();
});
