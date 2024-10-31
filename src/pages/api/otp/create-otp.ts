import { createOtpUseCase } from '@/features/api/otp/createOtpUseCase';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    createOtpUseCase(req.body.otpCode, req.body.phone);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res
      .status(400)
      .json({ error: 'Failed to create OTP code. Try again later' });
  }
}
