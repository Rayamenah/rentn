/*
  Warnings:

  - The primary key for the `Agent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Agent` table. All the data in the column will be lost.
  - The required column `agentId` was added to the `Agent` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_agentId_fkey";

-- DropIndex
DROP INDEX "Agent_id_email_idx";

-- AlterTable
ALTER TABLE "Agent" DROP CONSTRAINT "Agent_pkey",
DROP COLUMN "id",
ADD COLUMN     "agentId" TEXT NOT NULL,
ADD CONSTRAINT "Agent_pkey" PRIMARY KEY ("agentId");

-- CreateIndex
CREATE INDEX "Agent_agentId_email_idx" ON "Agent"("agentId", "email");

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("agentId") ON DELETE RESTRICT ON UPDATE CASCADE;
