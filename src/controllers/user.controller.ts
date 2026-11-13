import { sValidator } from "@hono/standard-validator";
import { createFactory } from "hono/factory";
import { idParamSchema } from "../validators/common.validator.ts";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/user.validator.ts";
import * as userService from "../services/user.service.ts";

const factory = createFactory();

export const getAll = factory.createHandlers(async (c) => {
  const users = await userService.getUsers();
  return c.json(users);
});

export const getById = factory.createHandlers(
  sValidator("param", idParamSchema),
  async (c) => {
    const user = await userService.getUser(c.req.valid("param").id);
    return c.json(user);
  },
);

export const create = factory.createHandlers(
  sValidator("json", createUserSchema),
  async (c) => {
    const user = await userService.createUser(c.req.valid("json"));
    return c.json(user, 201);
  },
);

export const update = factory.createHandlers(
  sValidator("param", idParamSchema),
  sValidator("json", updateUserSchema),
  async (c) => {
    const user = await userService.updateUser(
      c.req.valid("param").id,
      c.req.valid("json"),
    );
    return c.json(user, 200);
  },
);

export const remove = factory.createHandlers(
  sValidator("param", idParamSchema),
  async (c) => {
    const user = await userService.deleteUser(c.req.valid("param").id);
    return c.body(null, 204);
  },
);
