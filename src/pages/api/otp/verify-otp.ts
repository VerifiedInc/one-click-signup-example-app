import { verifyOtpUseCase } from '@/features/api/otp/verifyOtpUseCase';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export const path = () => '/api/otp/verify-otp';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  try {
    await verifyOtpUseCase(prisma, req.body.otpCode, req.body.phone);
    return res.status(200).json({ message: 'OTP verified' });
  } catch (error: any) {
    return res
      .status(400)
      .json({
        error: error.message || 'Failed to verify OTP code. Try again later',
      });
  }
}
