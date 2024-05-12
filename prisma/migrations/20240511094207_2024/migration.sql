-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('normal', 'half', 'mini');

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "status" "SessionStatus" NOT NULL DEFAULT 'normal';
