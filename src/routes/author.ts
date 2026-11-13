import { Hono } from "hono";
import * as authorController from "../controllers/author.controller.ts";

const app = new Hono();

app.get("/", ...authorController.getAll);
app.get("/:id", ...authorController.getById);
app.post("/", ...authorController.create);
app.put("/:id", ...authorController.update);
app.delete("/:id", ...authorController.remove);

export default app;
