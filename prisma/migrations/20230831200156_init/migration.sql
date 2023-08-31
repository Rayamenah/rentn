/*
  Warnings:

  - Added the required column `gender` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "gender" "GENDER" NOT NULL;
