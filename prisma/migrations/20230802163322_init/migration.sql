-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('agent', 'user', 'admin');

-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_VERIFIED', 'VERIFIED');

-- CreateEnum
CREATE TYPE "ProfileStatus" AS ENUM ('SUSPENDED', 'SCAMMER', 'ACTIVE', 'INACTIVE', 'DISABLED');

-- CreateTable
CREATE TABLE "Rentn" (
    "rentnId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NOT_VERIFIED',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "otp" TEXT NOT NULL,
    "secret" TEXT NOT NULL,

    CONSTRAINT "Rentn_pkey" PRIMARY KEY ("rentnId")
);

-- CreateTable
CREATE TABLE "Agent" (
    "agentId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" "GENDER" NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'agent',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "profileStatus" "ProfileStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("agentId")
);

-- CreateTable
CREATE TABLE "Users" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "Price" (
    "priceId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "tenure" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "apartmentType" TEXT NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("priceId")
);

-- CreateTable
CREATE TABLE "Apartment" (
    "apartmentId" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(5000) NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "community" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "apartmentType" TEXT NOT NULL,
    "features" TEXT[],
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "images" TEXT[],
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("apartmentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rentn_email_key" ON "Rentn"("email");

-- CreateIndex
CREATE INDEX "Rentn_rentnId_email_idx" ON "Rentn"("rentnId", "email");

-- CreateIndex
CREATE INDEX "Agent_agentId_idx" ON "Agent"("agentId");

-- CreateIndex
CREATE INDEX "Price_priceId_idx" ON "Price"("priceId");

-- CreateIndex
CREATE UNIQUE INDEX "Price_apartmentId_apartmentType_key" ON "Price"("apartmentId", "apartmentType");

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_profileId_key" ON "Apartment"("profileId");

-- CreateIndex
CREATE INDEX "Apartment_apartmentId_idx" ON "Apartment"("apartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_apartmentId_apartmentType_key" ON "Apartment"("apartmentId", "apartmentType");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_apartmentId_apartmentType_fkey" FOREIGN KEY ("apartmentId", "apartmentType") REFERENCES "Apartment"("apartmentId", "apartmentType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Agent"("agentId") ON DELETE RESTRICT ON UPDATE CASCADE;
