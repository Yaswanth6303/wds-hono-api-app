import { sValidator } from "@hono/standard-validator";
import { createFactory } from "hono/factory";
import { loginSchema, registerSchema } from "../validators/auth.validator.ts";
import * as authService from "../services/auth.service.ts";
import * as userService from "../services/user.service.ts";
import { requireAuth } from "../middlewares/auth.middleware.ts";
import type { JwtEnv } from "../types/auth.types.ts";

const factory = createFactory<JwtEnv>();

export const register = factory.createHandlers(
  sValidator("json", registerSchema),
  async (c) => {
    const result = await authService.register(c.req.valid("json"));
    return c.json(result, 201);
  },
);

export const login = factory.createHandlers(
  sValidator("json", loginSchema),
  async (c) => {
    const result = await authService.login(c.req.valid("json"));
    return c.json(result);
  },
);

export const me = factory.createHandlers(requireAuth, async (c) => {
  const { sub } = c.get("jwtPayload");
  const user = await userService.getUser(sub);
  return c.json(user);
});
