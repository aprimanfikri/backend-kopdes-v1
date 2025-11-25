import { CORS_ORIGIN } from "@/config/env";
import { errorHandler } from "@/middlewares/error.middleware";
import { RESPONSE_CODES } from "@/types";
import { responseHandler } from "@/utils/response";
import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());

app.use(
  cors({
    origin: CORS_ORIGIN,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "X-Service-Token"],
  })
);

app.get("/health", (c: Context) =>
  responseHandler.success(
    c,
    "Server is healthy",
    null,
    RESPONSE_CODES.SUCCESS,
    200
  )
);

app.onError(errorHandler);

app.notFound((c: Context) =>
  responseHandler.error(c, "Route not found", RESPONSE_CODES.NOT_FOUND, 404)
);

export default app;
