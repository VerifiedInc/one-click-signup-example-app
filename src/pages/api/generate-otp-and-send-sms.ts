import { generateOtpAndSendSmsUseCase } from '@/features/api/genateOtpAndSendSmsUseCase';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export const path = () => '/api/generate-otp-and-send-sms';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  try {
    await generateOtpAndSendSmsUseCase(prisma, req.body.phone);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res
      .status(400)
      .json({ error: 'Failed to Generate OTP and send SMS. Try again later' });
  }
}
