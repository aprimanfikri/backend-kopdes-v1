import { cors } from "hono/cors";
import { Context, Hono } from "hono";
import { logger } from "hono/logger";
import { RESPONSE_CODES } from "@/types";
import memberRoute from "@/routes/member.route";
import { responseHandler } from "@/utils/response";
import { errorHandler } from "@/middlewares/error.middleware";

const app = new Hono();

app.use(logger());

app.use(
  "*",
  cors({
    origin: ["https://kopdes.xfrhk.com"],
    credentials: true,
    allowMethods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-Service-Token",
    ],
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

app.route("/member", memberRoute);

app.onError(errorHandler);

app.notFound((c: Context) =>
  responseHandler.error(c, "Route not found", RESPONSE_CODES.NOT_FOUND, 404)
);

export default app;
