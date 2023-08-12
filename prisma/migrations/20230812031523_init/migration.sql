/*
  Warnings:

  - You are about to drop the column `agentId` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `apartmentId` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the column `apartmentType` on the `Price` table. All the data in the column will be lost.
  - Changed the type of `apartmentType` on the `Apartment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ApartmentType" AS ENUM ('SELF_CONTAIN', 'TWO_BEDROOM', 'THREE_BEDROOM', 'HOSTEL', 'BEDSITTER');

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_apartmentId_apartmentType_fkey";

-- DropIndex
DROP INDEX "Admin_adminId_idx";

-- DropIndex
DROP INDEX "Agent_agentId_idx";

-- DropIndex
DROP INDEX "Price_apartmentId_apartmentType_key";

-- DropIndex
DROP INDEX "Users_userId_idx";

-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "agentId",
ALTER COLUMN "description" SET DATA TYPE TEXT,
DROP COLUMN "apartmentType",
ADD COLUMN     "apartmentType" "ApartmentType" NOT NULL;

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "apartmentId",
DROP COLUMN "apartmentType";

-- CreateIndex
CREATE INDEX "Admin_adminId_email_idx" ON "Admin"("adminId", "email");

-- CreateIndex
CREATE INDEX "Agent_agentId_email_idx" ON "Agent"("agentId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_apartmentId_apartmentType_key" ON "Apartment"("apartmentId", "apartmentType");

-- CreateIndex
CREATE INDEX "Users_userId_email_idx" ON "Users"("userId", "email");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Apartment"("apartmentId") ON DELETE RESTRICT ON UPDATE CASCADE;
