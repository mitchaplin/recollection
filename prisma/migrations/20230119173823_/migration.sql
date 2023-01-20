/*
  Warnings:

  - You are about to drop the column `difficulty` on the `Collection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "difficulty",
ADD COLUMN     "category" TEXT DEFAULT 'Other',
ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "author" SET DEFAULT 'You',
ALTER COLUMN "description" SET DEFAULT 'No description';
