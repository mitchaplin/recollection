/*
  Warnings:

  - Added the required column `collectionId` to the `StudySession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudySession" ADD COLUMN     "collectionId" TEXT NOT NULL;
