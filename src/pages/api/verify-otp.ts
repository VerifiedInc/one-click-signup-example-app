import { verifyOtp } from '@/services/api/otp-sms-service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    verifyOtp(req.body.otpCode, req.body.phone);
    return res.status(200).json({ message: 'OTP verified' });
  } catch (error: any) {
    return res.status(400).json({
      error: error.message || 'Failed to verify OTP code. Try again later',
    });
  }
}
