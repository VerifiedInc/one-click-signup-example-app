import { PrismaClient } from '@prisma/client';
import * as verificationCodes from '@/../prisma/verificationCodes';

export function createOtpUseCase(
  prisma: PrismaClient,
  code: string,
  phone: string,
) {
  const expirationMinutes = 3;
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + expirationMinutes);

  return verificationCodes.create(prisma, {
    code,
    phone,
    expiresAt,
  }) as Promise<verificationCodes.VerificationCodes>;
}
