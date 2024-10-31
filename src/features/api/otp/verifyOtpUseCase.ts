import {
  findByPhoneAndCode,
  removeByUuid,
} from '../../../../persistence/otpPersistenceClient';

export function verifyOtpUseCase(code: string, phone: string) {
  console.log('Verifying OTP', { phone, code });

  const verificationCode = findByPhoneAndCode(phone, code);

  if (verificationCode?.code !== code || verificationCode?.phone !== phone) {
    throw new Error('Invalid or expired verification code');
  }

  console.log('OTP verified', { phone, code });

  // If the OTP is valid and has not expired, delete it from the database
  removeByUuid(verificationCode.uuid);
}
