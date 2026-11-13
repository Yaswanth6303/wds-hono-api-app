import { sValidator } from "@hono/standard-validator";
import { createFactory } from "hono/factory";
import { idParamSchema } from "../validators/common.validator.ts";
import {
  createAuthorSchema,
  updateAuthorSchema,
} from "../validators/author.validator.ts";
import * as authorService from "../services/author.service.ts";

// createHandlers keeps the validator's types flowing into c.req.valid()
const factory = createFactory();

export const getAll = factory.createHandlers(async (c) => {
  const authors = await authorService.getAuthors();
  return c.json(authors);
});

export const getById = factory.createHandlers(
  sValidator("param", idParamSchema),
  async (c) => {
    const author = await authorService.getAuthor(c.req.valid("param").id);
    return c.json(author);
  },
);

export const create = factory.createHandlers(
  sValidator("json", createAuthorSchema),
  async (c) => {
    const author = await authorService.createAuthor(c.req.valid("json"));
    return c.json(author, 201);
  },
);

export const update = factory.createHandlers(
  sValidator("param", idParamSchema),
  sValidator("json", updateAuthorSchema),
  async (c) => {
    const author = await authorService.updateAuthor(
      c.req.valid("param").id,
      c.req.valid("json"),
    );
    return c.json(author, 200);
  },
);

export const remove = factory.createHandlers(
  sValidator("param", idParamSchema),
  async (c) => {
    const author = await authorService.deleteAuthor(c.req.valid("param").id);
    return c.body(null, 204);
  },
);
