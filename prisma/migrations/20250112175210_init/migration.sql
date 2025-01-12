/*
  Warnings:

  - A unique constraint covering the columns `[collectionId,rank]` on the table `FlashCard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FlashCard_collectionId_rank_key" ON "FlashCard"("collectionId", "rank");
