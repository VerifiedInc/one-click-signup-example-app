import { config } from '@/config.server';

export async function sendSmsOTPUseCase(
  smsClient: SmsClient,
  phone: string,
  code: string,
) {
  if (!shouldSendSms(phone)) {
    return;
  }
  const message = `Enter this code to verify for Slooow: ${code}`;
  console.log(
    `sendSms: sending message to \`${phone}\` with message: ${message}`,
  );

  await smsClient.sendSms(phone, message);
}

function shouldSendSms(phone: string) {
  const doNotSendList = config.SMS_DO_NOT_SEND_LIST.split(',');
  // Check if the phone number is in the do not send list
  if (doNotSendList.includes(phone)) {
    console.log(
      `sendSms: not sending message to \`${phone}\` because it is in the do not send list`,
    );
    return false;
  }

  // If the do not send regex is not set, send the message
  if (!config.SMS_DO_NOT_SEND_REGEX) {
    return true;
  }

  const matchesDoNotSendRegex = new RegExp(config.SMS_DO_NOT_SEND_REGEX).test(
    phone,
  );
  console.log(`matchesDoNotSendRegex ${matchesDoNotSendRegex}`);

  // If the phone number matches the do not send regex, do not send the message
  if (matchesDoNotSendRegex) {
    console.log(
      `sendSms: not sending message to \`${phone}\` because it matches the do not send regex`,
    );

    return false;
  }

  return true;
}
