/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `auths` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "auths_userId_key" ON "auths"("userId");
