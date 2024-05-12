/*
  Warnings:

  - You are about to drop the column `players` on the `sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "players";

-- CreateTable
CREATE TABLE "session_joins" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "pcId" UUID NOT NULL,

    CONSTRAINT "session_joins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "session_joins" ADD CONSTRAINT "session_joins_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_joins" ADD CONSTRAINT "session_joins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_joins" ADD CONSTRAINT "session_joins_pcId_fkey" FOREIGN KEY ("pcId") REFERENCES "pcs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
