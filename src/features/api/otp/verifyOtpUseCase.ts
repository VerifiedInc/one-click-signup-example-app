import { PrismaClient } from '@prisma/client';
import * as verificationCodes from '@/../prisma/verificationCodes';

export async function verifyOtpUseCase(
  prisma: PrismaClient,
  code: string,
  phone: string,
) {
  console.log('Verifying OTP', { phone, code });

  const verificationCode = await verificationCodes.findByPhoneAndCode(prisma, {
    code,
    phone,
  });

  if (
    !verificationCode ||
    !(verificationCode.code === code && verificationCode.phone === phone)
  ) {
    throw new Error('Invalid or expired verification code');
  }

  console.log('OTP verified', { phone, code });

  // If the OTP is valid and has not expired, delete it from the database
  return verificationCodes.deleteByUuid(prisma, verificationCode.uuid);
}
