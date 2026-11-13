import { sValidator } from "@hono/standard-validator";
import type { Context } from "hono";
import { createFactory } from "hono/factory";
import { idParamSchema } from "../validators/common.validator.ts";
import { createApiKeySchema } from "../validators/apiKey.validator.ts";
import * as apiKeyService from "../services/apiKey.service.ts";
import type { JwtEnv } from "../types/auth.types.ts";

const factory = createFactory<JwtEnv>();

// requireAuth verifies the JWT, decodes its payload, and makes that payload available in the Hono 
// context (c) as "jwtPayload". Then the controller reads it with c.get("jwtPayload").
// c.get("jwtPayload") returns the decoded JWT payload object. For example, if the token contains:
/*
{
  sub: "user-123",
  role: "user",
  exp: 1794441600
}
*/
// payload.sub is "user-123"
const userIdFrom = (c: Context<JwtEnv>): string => c.get("jwtPayload").sub;

export const getAll = factory.createHandlers(async (c) => {
  const apiKeys = await apiKeyService.getApiKeys(userIdFrom(c));
  return c.json(apiKeys);
});

export const create = factory.createHandlers(
  sValidator("json", createApiKeySchema),
  async (c) => {
    const result = await apiKeyService.createApiKey(
      userIdFrom(c),
      c.req.valid("json").name,
    );
    return c.json(result, 201);
  },
);

export const remove = factory.createHandlers(
  sValidator("param", idParamSchema),
  async (c) => {
    const apiKey = await apiKeyService.deleteApiKey(
      c.req.valid("param").id,
      userIdFrom(c),
    );
    return c.body(null, 204);
  },
);
