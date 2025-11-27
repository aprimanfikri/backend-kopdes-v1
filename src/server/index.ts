import app from "@/app";
import { PORT } from "@/configs/env";

Bun.serve({
  port: PORT,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});

console.log(`Server running at port: ${PORT}`);
