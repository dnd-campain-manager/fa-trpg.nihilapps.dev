-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "startTime" DROP NOT NULL,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" DROP NOT NULL,
ALTER COLUMN "endTime" SET DATA TYPE TEXT,
ALTER COLUMN "gameTime" DROP NOT NULL;
