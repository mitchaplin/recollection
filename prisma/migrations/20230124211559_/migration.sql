/*
  Warnings:

  - You are about to drop the column `collectionId` on the `StudySession` table. All the data in the column will be lost.
  - Added the required column `collectionName` to the `StudySession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudySession" DROP CONSTRAINT "StudySession_collectionId_fkey";

-- DropIndex
DROP INDEX "StudySession_collectionId_key";

-- AlterTable
ALTER TABLE "StudySession" DROP COLUMN "collectionId",
ADD COLUMN     "collectionName" TEXT NOT NULL;
