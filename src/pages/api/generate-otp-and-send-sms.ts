import TwilioClient from '@/clients/twilio.client';
import { config } from '@/config.server';
import { generateOtpAndSendSmsUseCase } from '@/features/api/genateOtpAndSendSmsUseCase';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export const path = () => '/api/generate-otp-and-send-sms';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = new TwilioClient(
      config.TWILIO_ACCOUNT_SID,
      config.TWILIO_AUTH_TOKEN,
    );
    const prisma = new PrismaClient();

    const otp = await generateOtpAndSendSmsUseCase(
      client,
      prisma,
      req.body.phone,
    );
    return res.status(200).json({ otp });
  } catch (error: any) {
    console.log(error);

    return res.status(400).json({
      error:
        error.message || 'Failed to Generate OTP and send SMS. Try again later',
    });
  }
}
