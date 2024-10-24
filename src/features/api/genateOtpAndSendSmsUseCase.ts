import { PrismaClient } from '@prisma/client';
import { generateOTP } from '../utils/otp';
import { createOtpUseCase } from './otp/createOtpUseCase';
import { sendSmsOTPUseCase } from './sms/useCases/sendSmsOTPUseCase';

export async function generateOtpAndSendSmsUseCase(
  prisma: PrismaClient,
  phone: string,
) {
  const code = generateOTP(phone);
  const otp = await createOtpUseCase(prisma, code, phone);
  await sendSmsOTPUseCase(otp.phone, otp.code);

  return otp;
}
