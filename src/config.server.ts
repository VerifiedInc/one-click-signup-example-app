interface Config {
  NODE_ENV: string;
  ENV: string;
  ONE_CLICK_API_KEY?: string;
  ONE_CLICK_API_URL?: string;
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_PHONE_NUMBER?: string;
  SMS_DO_NOT_SEND_LIST?: string;
  SMS_DO_NOT_SEND_REGEX?: string;
}

export const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  ENV: process.env.NEXT_PUBLIC_ENV || 'local',
  ONE_CLICK_API_KEY: process.env.ONE_CLICK_API_KEY,
  ONE_CLICK_API_URL: process.env.ONE_CLICK_API_URL,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  SMS_DO_NOT_SEND_LIST: process.env.SMS_DO_NOT_SEND_LIST,
  SMS_DO_NOT_SEND_REGEX: process.env.SMS_DO_NOT_SEND_REGEX,
};
