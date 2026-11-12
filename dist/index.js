import { serve } from "@hono/node-server";
import { Hono } from "hono";
import authorRoutes from "./routes/author.js";
const app = new Hono();
app.route("/authors", authorRoutes);
app.get("/", (c) => {
    return c.json({
        message: "Server is healthy",
    }, 200);
});
serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
