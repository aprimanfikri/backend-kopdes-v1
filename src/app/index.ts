import { cors } from "hono/cors";
import { Context, Hono } from "hono";
import { logger } from "hono/logger";
import { RESPONSE_CODES } from "@/types";
import { CORS_ORIGIN } from "@/configs/env";
import memberRoute from "@/routes/member.route";
import { responseHandler } from "@/utils/response";
import { errorHandler } from "@/middlewares/error.middleware";

const app = new Hono();

app.use(logger());

function normalizeOrigin(origin?: string): string | null {
  if (!origin) return null;
  try {
    const u = new URL(origin);
    const p = u.port ? `:${u.port}` : "";
    return `${u.protocol}//${u.hostname}${p}`;
  } catch {
    return origin;
  }
}

const ALLOWED = CORS_ORIGIN.map((o) => normalizeOrigin(o)).filter(
  (v): v is string => Boolean(v)
);

function isAllowed(origin?: string): string {
  const no = normalizeOrigin(origin);
  if (!no) return "";
  for (const raw of CORS_ORIGIN) {
    try {
      const a = new URL(raw);
      const o = new URL(no);
      const portMatch = a.port ? a.port === o.port : true;
      if (a.protocol === o.protocol && a.hostname === o.hostname && portMatch)
        return no;
    } catch {
      if (ALLOWED.includes(no)) return no;
      if (raw.includes("*")) {
        const rx = new RegExp(
          "^" + raw.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$"
        );
        if (rx.test(no)) return no;
      }
    }
  }
  console.warn(`[CORS] Blocked origin: ${origin}`);
  return "";
}

app.use(
  "*",
  cors({
    origin: (origin: string | undefined) => isAllowed(origin),
    credentials: true,
    allowMethods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
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
