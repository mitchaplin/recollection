/*
  Warnings:

  - Made the column `author` on table `Collection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Collection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Collection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "author" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL;
