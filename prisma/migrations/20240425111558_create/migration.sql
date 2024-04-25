-- CreateEnum
CREATE TYPE "HeadingLevel" AS ENUM ('h2', 'h3', 'h4', 'h5', 'h6');

-- CreateEnum
CREATE TYPE "MessageColor" AS ENUM ('blue', 'red', 'yellow', 'green');

-- CreateEnum
CREATE TYPE "PcClass" AS ENUM ('none', 'fighter', 'ranger', 'monk', 'rogue', 'paladin', 'cleric', 'babarian', 'bard', 'wizard', 'druid', 'sorcerer', 'warlock', 'artificer');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('god', 'material', 'character', 'event', 'organization', 'nation', 'race', 'landscape');

-- CreateEnum
CREATE TYPE "BlockName" AS ENUM ('text', 'heading', 'image', 'orderedList', 'unOrderedList', 'message', 'quote');

-- CreateEnum
CREATE TYPE "CampainStatus" AS ENUM ('ready', 'open', 'close');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('player', 'creator');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'normal');

-- CreateEnum
CREATE TYPE "MasterType" AS ENUM ('mainMaster', 'subMaster');

-- CreateEnum
CREATE TYPE "DocumentImportance" AS ENUM ('core', 'side');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "userType" "UserType" NOT NULL DEFAULT 'player',
    "userRole" "UserRole" NOT NULL DEFAULT 'normal',
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
    "password" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,

    CONSTRAINT "auths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "masters" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "campainId" UUID NOT NULL,
    "masterType" "MasterType" NOT NULL,

    CONSTRAINT "masters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campains" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "status" "CampainStatus" NOT NULL DEFAULT 'ready',
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "url" TEXT NOT NULL,
    "subMaster" TEXT[],

    CONSTRAINT "campains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL,
    "campainId" UUID NOT NULL,
    "masterId" UUID NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "playersNumber" INTEGER NOT NULL,
    "players" TEXT[],
    "exp" INTEGER NOT NULL DEFAULT 0,
    "rewardUrl" TEXT,
    "gameTime" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "importance" "DocumentImportance" NOT NULL DEFAULT 'core',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pcs" (
    "id" UUID NOT NULL,
    "campainId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 0,
    "organization" TEXT,
    "story" TEXT,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "pp" INTEGER NOT NULL DEFAULT 0,
    "gp" INTEGER NOT NULL DEFAULT 0,
    "ep" INTEGER NOT NULL DEFAULT 0,
    "sp" INTEGER NOT NULL DEFAULT 0,
    "cp" INTEGER NOT NULL DEFAULT 0,
    "url" TEXT NOT NULL,

    CONSTRAINT "pcs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" UUID NOT NULL,
    "pcId" UUID NOT NULL,
    "order" INTEGER NOT NULL,
    "className" "PcClass" NOT NULL,
    "level" INTEGER,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templates" (
    "id" UUID NOT NULL,
    "name" "DocumentType" NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edit_blocks" (
    "id" UUID NOT NULL,
    "name" "BlockName" NOT NULL DEFAULT 'text',
    "documentSectionId" UUID NOT NULL,
    "order" INTEGER NOT NULL,
    "text" TEXT,
    "link" TEXT,
    "alt" TEXT,
    "items" JSONB,
    "messageColor" "MessageColor" DEFAULT 'blue',
    "who" TEXT,
    "headingLevel" "HeadingLevel" DEFAULT 'h3',

    CONSTRAINT "edit_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_sections" (
    "id" UUID NOT NULL,
    "documentId" UUID,
    "templateId" UUID,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "document_sections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE INDEX "auths_userId_idx" ON "auths"("userId");

-- CreateIndex
CREATE INDEX "masters_userId_campainId_idx" ON "masters"("userId", "campainId");

-- CreateIndex
CREATE UNIQUE INDEX "campains_name_key" ON "campains"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_name_key" ON "sessions"("name");

-- CreateIndex
CREATE INDEX "pcs_userId_name_idx" ON "pcs"("userId", "name");

-- CreateIndex
CREATE INDEX "classes_pcId_className_idx" ON "classes"("pcId", "className");

-- AddForeignKey
ALTER TABLE "auths" ADD CONSTRAINT "auths_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "masters" ADD CONSTRAINT "masters_campainId_fkey" FOREIGN KEY ("campainId") REFERENCES "campains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "masters" ADD CONSTRAINT "masters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_campainId_fkey" FOREIGN KEY ("campainId") REFERENCES "campains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "masters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcs" ADD CONSTRAINT "pcs_campainId_fkey" FOREIGN KEY ("campainId") REFERENCES "campains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcs" ADD CONSTRAINT "pcs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_pcId_fkey" FOREIGN KEY ("pcId") REFERENCES "pcs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edit_blocks" ADD CONSTRAINT "edit_blocks_documentSectionId_fkey" FOREIGN KEY ("documentSectionId") REFERENCES "document_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_sections" ADD CONSTRAINT "document_sections_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_sections" ADD CONSTRAINT "document_sections_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
