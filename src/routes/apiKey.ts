import { Hono } from "hono";
import * as apiKeyController from "../controllers/apiKey.controller.ts";
import { requireAuth } from "../middlewares/auth.middleware.ts";

const app = new Hono();

// Every API key route needs a logged-in user (sets c.get("jwtPayload"))
app.use("*", requireAuth);

app.get("/", ...apiKeyController.getAll);
app.post("/", ...apiKeyController.create);
app.delete("/:id", ...apiKeyController.remove);

export default app;
