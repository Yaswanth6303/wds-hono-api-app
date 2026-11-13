import { Hono } from "hono";
import * as userController from "../controllers/user.controller.ts";

const app = new Hono();

app.get("/", ...userController.getAll);
app.get("/:id", ...userController.getById);
app.post("/", ...userController.create);
app.put("/:id", ...userController.update);
app.delete("/:id", ...userController.remove);

export default app;
