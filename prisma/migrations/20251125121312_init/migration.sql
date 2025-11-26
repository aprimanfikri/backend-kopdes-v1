-- CreateTable
CREATE TABLE "members" (
    "id" VARCHAR(128) NOT NULL,
    "name" TEXT NOT NULL,
    "code" VARCHAR(128) NOT NULL,
    "barcode" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "card" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);
