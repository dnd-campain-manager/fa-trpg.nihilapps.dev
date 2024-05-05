-- CreateEnum
CREATE TYPE "MasterStatus" AS ENUM ('join', 'leave');

-- AlterTable
ALTER TABLE "masters" ADD COLUMN     "masterStatus" "MasterStatus" NOT NULL DEFAULT 'join';
