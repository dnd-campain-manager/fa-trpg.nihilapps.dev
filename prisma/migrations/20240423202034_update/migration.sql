/*
  Warnings:

  - The `level` column on the `classes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "classes" DROP COLUMN "level",
ADD COLUMN     "level" INTEGER;

-- AlterTable
ALTER TABLE "pcs" ALTER COLUMN "story" DROP NOT NULL;
