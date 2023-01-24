/*
  Warnings:

  - You are about to drop the column `accuracy` on the `StudySession` table. All the data in the column will be lost.
  - Added the required column `score` to the `StudySession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudySession" DROP COLUMN "accuracy",
ADD COLUMN     "score" INTEGER NOT NULL;
