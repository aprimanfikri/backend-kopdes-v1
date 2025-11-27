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

export default prisma;
