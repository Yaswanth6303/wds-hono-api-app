import { serve } from "@hono/node-server";
import { Hono } from "hono";
import authorRoutes from "./routes/author.ts";
import { env } from "./config/env.ts";

const app = new Hono();

app.route("/authors", authorRoutes);

app.get("/", (c) => {
  return c.json(
    {
      message: "Server is healthy",
    },
    200,
  );
});

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
