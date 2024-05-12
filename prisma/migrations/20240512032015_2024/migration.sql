-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "note" TEXT,
ALTER COLUMN "content" DROP NOT NULL;
