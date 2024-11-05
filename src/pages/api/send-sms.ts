import { sendSms } from '@/services/api/otp-sms-service';
import { NextApiRequest, NextApiResponse } from 'next';

export default function (req: NextApiRequest, res: NextApiResponse) {
  try {
    sendSms(req.body.phone, req.body.otp);

    return res.status(200).json({ message: 'SMS sent successfully' });
  } catch (error: any) {
    console.log(error);

    return res.status(400).json({
      error:
        error.message || 'Failed to Generate OTP and send SMS. Try again later',
    });
  }
}
