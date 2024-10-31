import {
  createOtp,
  VerificationCode,
} from '../../../../persistence/otpPersistenceClient';

export function createOtpUseCase(
  code: string,
  phone: string,
): VerificationCode {
  const expirationMinutes = 3;
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + expirationMinutes);

  // Otp database simulation
  // For learning purposes, we are using a JSON file to store the OTPs
  return createOtp({
    code,
    phone,
    expiresAt,
  });
}
