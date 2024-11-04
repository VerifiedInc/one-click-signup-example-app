import { sendSms } from '@/services/api/otp-sms-service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    sendSms(req.body.phone, req.body.otp);

    return res.status(200);
  } catch (error: any) {
    console.log(error);

    return res.status(400).json({
      error:
        error.message || 'Failed to Generate OTP and send SMS. Try again later',
    });
  }
}
