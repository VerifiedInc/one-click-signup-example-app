import { config } from '@/config.server';

export const generateOTP = (phone: string) => {
  const matchesDoNotSendRegex = config.SMS_DO_NOT_SEND_REGEX
    ? new RegExp(config.SMS_DO_NOT_SEND_REGEX).test(phone)
    : false;

  const doNotSendList = config.SMS_DO_NOT_SEND_LIST.split(',');

  // If the phone number is in the do not send list or matches the do not send regex, return a fixed OTP
  if (doNotSendList.includes(phone) || matchesDoNotSendRegex) {
    return '111111';
  }

  // Otherwise, generate a random 6-digit OTP
  return Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, '0');
};
