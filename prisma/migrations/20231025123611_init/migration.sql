/*
  Warnings:

  - You are about to drop the column `images` on the `Apartment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "Image" (
    "imageId" TEXT NOT NULL,
    "cloudinaryId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "apartmentId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("imageId")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
