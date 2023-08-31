/*
  Warnings:

  - You are about to drop the column `email` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Admin_email_key";

-- DropIndex
DROP INDEX "Admin_id_email_idx";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "email",
DROP COLUMN "password";

-- CreateIndex
CREATE INDEX "Admin_id_idx" ON "Admin"("id");
