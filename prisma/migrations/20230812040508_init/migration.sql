/*
  Warnings:

  - The values [SELF_CONTAIN,TWO_BEDROOM,THREE_BEDROOM,HOSTEL,BEDSITTER] on the enum `ApartmentType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Male,Female] on the enum `GENDER` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApartmentType_new" AS ENUM ('self_contain', 'two_bedroom', 'three_bedroom', 'hostel', 'bedsitter');
ALTER TABLE "Apartment" ALTER COLUMN "apartmentType" TYPE "ApartmentType_new" USING ("apartmentType"::text::"ApartmentType_new");
ALTER TYPE "ApartmentType" RENAME TO "ApartmentType_old";
ALTER TYPE "ApartmentType_new" RENAME TO "ApartmentType";
DROP TYPE "ApartmentType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "GENDER_new" AS ENUM ('male', 'female');
ALTER TABLE "Agent" ALTER COLUMN "gender" TYPE "GENDER_new" USING ("gender"::text::"GENDER_new");
ALTER TYPE "GENDER" RENAME TO "GENDER_old";
ALTER TYPE "GENDER_new" RENAME TO "GENDER";
DROP TYPE "GENDER_old";
COMMIT;
