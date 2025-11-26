/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `members` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "members_code_key" ON "members"("code");
