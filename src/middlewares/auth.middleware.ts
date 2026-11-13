import { jwt } from "hono/jwt";
import { env } from "../config/env.ts";

export const requireAuth = jwt({ secret: env.JWT_SECRET, alg: "HS256" });
