-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('agent', 'user', 'admin');

-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_VERIFIED', 'VERIFIED');

-- CreateEnum
CREATE TYPE "ProfileStatus" AS ENUM ('SUSPENDED', 'SCAMMER', 'ACTIVE', 'INACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "ApartmentType" AS ENUM ('self_contain', 'two_bedroom', 'three_bedroom', 'hostel', 'bedsitter');

-- CreateTable
CREATE TABLE "Rentn" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NOT_VERIFIED',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "otp" TEXT NOT NULL,
    "secret" TEXT NOT NULL,

    CONSTRAINT "Rentn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" "GENDER" NOT NULL,
    "rentnId" TEXT NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'agent',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "profileStatus" "ProfileStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'user',
    "rentnId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rentnId" TEXT NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apartment" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "features" TEXT[],
    "community" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "apartmentType" "ApartmentType" NOT NULL,
    "agentId" TEXT NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "tenure" INTEGER NOT NULL DEFAULT 0,
    "images" TEXT[],

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rentn_email_key" ON "Rentn"("email");

-- CreateIndex
CREATE INDEX "Rentn_id_email_idx" ON "Rentn"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_email_key" ON "Agent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_rentnId_key" ON "Agent"("rentnId");

-- CreateIndex
CREATE INDEX "Agent_id_email_idx" ON "Agent"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_rentnId_key" ON "Users"("rentnId");

-- CreateIndex
CREATE INDEX "Users_id_email_idx" ON "Users"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_rentnId_key" ON "Admin"("rentnId");

-- CreateIndex
CREATE INDEX "Admin_id_email_idx" ON "Admin"("id", "email");

-- CreateIndex
CREATE INDEX "Apartment_id_idx" ON "Apartment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_id_apartmentType_key" ON "Apartment"("id", "apartmentType");

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_rentnId_fkey" FOREIGN KEY ("rentnId") REFERENCES "Rentn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_rentnId_fkey" FOREIGN KEY ("rentnId") REFERENCES "Rentn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_rentnId_fkey" FOREIGN KEY ("rentnId") REFERENCES "Rentn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
