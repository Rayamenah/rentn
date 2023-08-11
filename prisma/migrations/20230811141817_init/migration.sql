/*
  Warnings:

  - You are about to drop the column `profileId` on the `Apartment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Apartment_profileId_key";

-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "profileId";

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Rentn"("rentnId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Rentn"("rentnId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Rentn"("rentnId") ON DELETE RESTRICT ON UPDATE CASCADE;
