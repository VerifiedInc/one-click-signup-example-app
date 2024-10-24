import twilio from 'twilio';
import { config } from '@/config.server';

export default async function sendSms(phone: string, message: string) {
  if (
    !config.TWILIO_ACCOUNT_SID ||
    !config.TWILIO_AUTH_TOKEN ||
    !config.TWILIO_PHONE_NUMBER
  ) {
    throw new Error('Twilio credentials are not set');
  }

  if (shouldNotSendSms(phone)) {
    return;
  }

  console.log(`sendSms: sending message "${message}" to ${phone}`);

  const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

  client.messages
    .create({
      from: '+13157125351',
      to: phone,
      body: message,
    })
    //Send back a response
    .then((message) => message.sid)
    .catch((err) => {
      throw new Error(err.message);
    });
}

function shouldNotSendSms(phone: string) {
  if (config.SMS_DO_NOT_SEND_REGEX) {
    const matchesDoNotSendRegex = new RegExp(config.SMS_DO_NOT_SEND_REGEX).test(
      phone,
    );

    console.log(`matchesDoNotSendRegex ${matchesDoNotSendRegex}`);
    if (!matchesDoNotSendRegex) {
      return false;
    }
    console.log(
      `sendSms: not sending message to \`${phone}\` because it matches the do not send regex`,
    );

    return true;
  }

  if (config.SMS_DO_NOT_SEND_LIST) {
    const doNotSendList = config.SMS_DO_NOT_SEND_LIST.split(',');
    if (doNotSendList.includes(phone)) {
      return false;
    }
    console.log(
      `sendSms: not sending message to \`${phone}\` because it is in the do not send list`,
    );

    return true;
  }
}
