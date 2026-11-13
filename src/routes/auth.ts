import { Hono } from "hono";
import * as authController from "../controllers/auth.controller.ts";

const app = new Hono();

app.post("/register", ...authController.register);
app.post("/login", ...authController.login);
app.get("/me", ...authController.me);

export default app;
