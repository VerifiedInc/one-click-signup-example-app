import sendSms from '../sms.clients';

export async function sendSmsOTPUseCase(phone: string, code: string) {
  await sendSms(
    phone,
    `Enter this code to verify for 1-Click Starter App: ${code}`,
  );
}
