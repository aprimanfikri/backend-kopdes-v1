import { DATABASE_URL } from "@/configs/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({ connectionString: DATABASE_URL });

pool
  .connect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

export const db = drizzle({ client: pool });
