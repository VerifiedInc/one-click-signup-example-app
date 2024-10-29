import { createOtpUseCase } from '@/features/api/otp/createOtpUseCase';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export const path = () => '/api/otp/create-otp';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();

  try {
    await createOtpUseCase(prisma, req.body.otpCode, req.body.phone);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res
      .status(400)
      .json({ error: 'Failed to create OTP code. Try again later' });
  }
}
