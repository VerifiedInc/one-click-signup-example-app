import { config } from '@/config.server';

export default class TwilioClient implements SmsClient {
  private client: any;

  constructor(twilioAccountSid?: string, twilioAuthToken?: string) {
    if (!twilioAccountSid || !twilioAuthToken) {
      throw new Error('Twilio credentials are not set');
    }

    let twilio: any;

    // It was necessary to check because next.js was trying to run this in the client-side somehow
    if (typeof window === 'undefined') {
      twilio = require('twilio');
    } else {
      throw new Error('Twilio is not available in the browser');
    }

    this.client = twilio(twilioAccountSid, twilioAuthToken);
  }

  async sendSms(phone: string, message: string) {
    return this.client.messages
      .create({
        from: config.TWILIO_PHONE_NUMBER,
        to: phone,
        body: message,
      })
      .then((message: { sid: any }) => message.sid)
      .catch((err: { message: string | undefined }) => {
        throw new Error(err.message);
      });
  }
}
