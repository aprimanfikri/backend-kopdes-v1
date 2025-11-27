import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL, NODE_ENV } from "@/configs/env";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (NODE_ENV !== "prod") globalForPrisma.prisma = prisma;

prisma
  .$connect()
  .then(() => console.log("Database connected"))
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

export default prisma;
