import { sValidator } from "@hono/standard-validator";
import { Hono } from "hono";
import { createAuthorSchema, updateAuthorSchema } from "../types/author.js";
import da from "zod/v4/locales/da.cjs";
const app = new Hono();
const authors = [
    {
        id: "1",
        name: "Yaswanth",
        birthday: new Date(),
    },
    {
        id: "2",
        name: "Rahul",
        birthday: new Date(),
    },
    {
        id: "3",
        name: "Ramesh",
        birthday: new Date(),
    },
];
app.get("/", (c) => {
    return c.json({
        authors,
    });
});
app.get("/:id", (c) => {
    const id = c.req.param("id");
    const author = authors.find((x) => x.id == id);
    if (!author) {
        return c.json({
            error: "Author not found",
        }, 404);
    }
    return c.json(author);
});
app.post("/", sValidator("json", createAuthorSchema), (c) => {
    const data = c.req.valid("json");
    const author = {
        id: crypto.randomUUID(),
        name: data.name,
        birthday: data.birthday,
    };
    authors.push(author);
    return c.json(author, 201);
});
app.put("/:id", sValidator("json", updateAuthorSchema), (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const author = authors.find((x) => x.id === id);
    if (!author) {
        return c.json({
            error: "No author found",
        }, 404);
    }
    if (data.name !== undefined) {
        author.name = data.name;
    }
    if (data.birthday !== undefined) {
        author.birthday = data.birthday;
    }
    return c.json(author, 200);
});
export default app;
