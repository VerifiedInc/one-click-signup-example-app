import { verifyOtpUseCase } from '@/features/api/otp/verifyOtpUseCase';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export const path = () => '/api/otp/verify-otp';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  try {
    await verifyOtpUseCase(prisma, req.body.otpCode, req.body.phone);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res
      .status(400)
      .json({ error: 'Failed to verify OTP code. Try again later' });
  }
}
