import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // log: ['query'],
    // errorFormat: 'pretty', removed prisma query on the log
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
