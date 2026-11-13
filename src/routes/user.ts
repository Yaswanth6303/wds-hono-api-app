import { Hono } from "hono";
import * as userController from "../controllers/user.controller.ts";
import { requireApiKey } from "../middlewares/apiKey.middleware.ts";

const app = new Hono();

app.get("/", requireApiKey, ...userController.getAll);
app.get("/:id", ...userController.getById);
app.post("/", ...userController.create);
app.put("/:id", ...userController.update);
app.delete("/:id", ...userController.remove);

export default app;
