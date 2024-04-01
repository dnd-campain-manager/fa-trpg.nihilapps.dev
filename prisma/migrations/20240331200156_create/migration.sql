-- CreateEnum
CREATE TYPE "MasterType" AS ENUM ('MAIN', 'SUB');

-- CreateEnum
CREATE TYPE "ParentType" AS ENUM ('SESSION', 'CAMPAIN');

-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('HEADING', 'TEXT', 'IMAGE', 'LIST', 'QUOTE', 'MESSAGE', 'YOUTUBE');

-- CreateEnum
CREATE TYPE "MessageColor" AS ENUM ('RED', 'BLUE', 'GREEN', 'YELLOW');

-- CreateEnum
CREATE TYPE "HeadingLevel" AS ENUM ('H2', 'H3', 'H4', 'H5', 'H6');

-- CreateEnum
CREATE TYPE "ListType" AS ENUM ('ORDERED', 'UNORDERED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PLAYER', 'MASTER');

-- CreateEnum
CREATE TYPE "CampainStatus" AS ENUM ('READY', 'OPEN', 'CLOSE');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('MINI', 'NORMAL', 'MAIN');

-- CreateEnum
CREATE TYPE "PcClass" AS ENUM ('NONE', 'FIGHTER', 'RANGER', 'MONK', 'ROGUE', 'PALADIN', 'CLERIC', 'BABARIAN', 'BARD', 'WIZARD', 'DRUID', 'SORCERER', 'WARLOCK', 'ARTIFICER');

-- CreateTable
CREATE TABLE "masters" (
    "id" UUID NOT NULL,
    "campainId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" "MasterType" NOT NULL DEFAULT 'MAIN',

    CONSTRAINT "masters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'PLAYER',
    "playToken" INTEGER NOT NULL DEFAULT 0,
    "playCount" INTEGER NOT NULL DEFAULT 0,
    "masterPoint" INTEGER NOT NULL DEFAULT 0,
    "masterCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auths" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "auths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campains" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" JSONB NOT NULL,
    "infoUrl" TEXT NOT NULL,
    "status" "CampainStatus" NOT NULL DEFAULT 'READY',

    CONSTRAINT "campains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pcs" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "campainId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "backStory" TEXT NOT NULL,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "gold" INTEGER NOT NULL DEFAULT 0,
    "isLevelUpStop" BOOLEAN NOT NULL DEFAULT false,
    "class1" "PcClass" NOT NULL DEFAULT 'NONE',
    "level1" INTEGER NOT NULL DEFAULT 1,
    "class2" "PcClass" NOT NULL DEFAULT 'NONE',
    "level2" INTEGER NOT NULL DEFAULT 0,
    "class3" "PcClass" NOT NULL DEFAULT 'NONE',
    "level3" INTEGER NOT NULL DEFAULT 0,
    "beyondUrl" TEXT NOT NULL,

    CONSTRAINT "pcs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL,
    "campainId" UUID NOT NULL,
    "masterId" UUID NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "type" "SessionType" NOT NULL DEFAULT 'NORMAL',
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "exp" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "player" INTEGER NOT NULL,
    "rewardUrl" TEXT NOT NULL,
    "userId" UUID,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "editblocks" (
    "id" UUID NOT NULL,
    "campainId" UUID,
    "sessionId" UUID,
    "name" "BlockType" NOT NULL DEFAULT 'TEXT',
    "parent" "ParentType" NOT NULL,
    "level" "HeadingLevel" DEFAULT 'H2',
    "text" TEXT,
    "link" TEXT,
    "alt" TEXT,
    "color" "MessageColor" DEFAULT 'BLUE',
    "listType" "ListType" DEFAULT 'UNORDERED',
    "items" JSONB,
    "who" TEXT,
    "videoId" TEXT,

    CONSTRAINT "editblocks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "masters" ADD CONSTRAINT "masters_campainId_fkey" FOREIGN KEY ("campainId") REFERENCES "campains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "masters" ADD CONSTRAINT "masters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auths" ADD CONSTRAINT "auths_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcs" ADD CONSTRAINT "pcs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcs" ADD CONSTRAINT "pcs_campainId_fkey" FOREIGN KEY ("campainId") REFERENCES "campains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_campainId_fkey" FOREIGN KEY ("campainId") REFERENCES "campains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "masters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editblocks" ADD CONSTRAINT "editblocks_campainId_fkey" FOREIGN KEY ("campainId") REFERENCES "campains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editblocks" ADD CONSTRAINT "editblocks_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
