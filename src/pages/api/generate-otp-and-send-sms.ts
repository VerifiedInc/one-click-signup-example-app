import { generateOtpAndSendSms } from '@/services/api/otp-sms-service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const otp = generateOtpAndSendSms(req.body.phone);
    return res.status(200).json({ otp });
  } catch (error: any) {
    console.log(error);

    return res.status(400).json({
      error:
        error.message || 'Failed to Generate OTP and send SMS. Try again later',
    });
  }
}
