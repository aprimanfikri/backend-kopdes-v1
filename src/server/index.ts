import app from "@/app";
import { PORT } from "@/config/env";

Bun.serve({
  port: PORT,
  fetch: app.fetch,
});

console.log(`Server running at port: ${PORT}`);
