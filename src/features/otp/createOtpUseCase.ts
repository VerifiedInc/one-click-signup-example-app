import { PrismaClient } from '@prisma/client';
import * as verificationCodes from '../../../prisma/verificationCodes';

type Options = {
  prisma: PrismaClient;
  code: string;
  phone: string;
};

export function createOtpUseCase(options: Options) {
  const { prisma, code, phone } = options;
  const expirationMinutes = 3;
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + expirationMinutes);

  return verificationCodes.create(prisma, {
    code,
    phone,
    expiresAt,
  }) as Promise<verificationCodes.VerificationCodes>;
}
