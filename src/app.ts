import { Hono } from "hono";
import authorRoutes from "./routes/author.ts";
import userRoutes from "./routes/user.ts";
import authRoutes from "./routes/auth.ts";
import apiKeyRoutes from "./routes/apiKey.ts";
import { errorHandler, notFoundHandler } from "./errors/error.handler.ts";

const app = new Hono();

app.route("/authors", authorRoutes);
app.route("/users", userRoutes);
app.route("/auth", authRoutes);
app.route("/api-keys", apiKeyRoutes);

app.get("/", (c) => {
  return c.json(
    {
      message: "Server is healthy",
    },
    200,
  );
});

app.onError(errorHandler);
app.notFound(notFoundHandler);

export default app;
