// lib/prisma.ts
/* eslint-disable @typescript-eslint/no-var-requires */
let PrismaPkg: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PrismaPkg = require('@prisma/client');
} catch (e) {
  PrismaPkg = null;
}

type AnyPrisma = any;
const PrismaClientCtor: AnyPrisma = PrismaPkg
  ? PrismaPkg.PrismaClient ?? PrismaPkg.default?.PrismaClient ?? PrismaPkg.default ?? null
  : null;

const globalForPrisma = globalThis as unknown as { prisma?: AnyPrisma };

export const prisma: AnyPrisma =
  globalForPrisma.prisma ??
  (PrismaClientCtor
    ? new PrismaClientCtor({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      })
    : (null as any));

if (process.env.NODE_ENV !== 'production' && PrismaClientCtor) globalForPrisma.prisma = prisma;

export default prisma;
