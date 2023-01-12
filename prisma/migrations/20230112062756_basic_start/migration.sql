/*
  Warnings:

  - You are about to drop the column `difficulty` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_collectionCollectionId_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "difficulty";

-- DropTable
DROP TABLE "Card";

-- CreateTable
CREATE TABLE "FlashCard" (
    "cardId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FlashCard_cardId_key" ON "FlashCard"("cardId");
