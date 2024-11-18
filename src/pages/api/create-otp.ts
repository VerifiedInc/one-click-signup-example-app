import { createOtp } from '@/services/api/otp-sms-service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    createOtp(req.body.otpCode, req.body.phone);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res
      .status(400)
      .json({ error: 'Failed to create Verification Code. Try again later' });
  }
}
