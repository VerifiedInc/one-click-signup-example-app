import { PrismaClient } from '@prisma/client';

/**
 * INTERNAL ONLY
 * @param prisma
 * @param options
 */
export const findByPhone = async (
  prisma: PrismaClient,
  options: { phone: string }
): Promise<VerificationCodes | null> => {
  // Find valid verification code by phone and code.
  return prisma.verificationCodes.findFirst({
    where: { ...options, expiresAt: { gte: new Date() } },
  });
};

export const findByPhoneAndCode = async (
  prisma: PrismaClient,
  options: { code: string; phone: string }
): Promise<VerificationCodes | null> => {
  // Find valid verification code by phone and code.
  return prisma.verificationCodes.findFirst({
    where: { ...options, expiresAt: { gte: new Date() } },
  });
};

export const create = async (
  prisma: PrismaClient,
  options: Pick<VerificationCodes, 'code' | 'phone' | 'expiresAt'>
): Promise<VerificationCodes> => {
  return prisma.verificationCodes.create({ data: options });
};

export const deleteByUuid = async (
  prisma: PrismaClient,
  uuid: string
): Promise<VerificationCodes> => {
  return prisma.verificationCodes.delete({ where: { uuid } });
};

export type VerificationCodes = {
  uuid: string;
  code: string;
  phone: string;

  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
};
