import {
  VerificationCode,
  persistOtp,
  findByPhoneAndCode,
  removeByUuid,
} from './otp-persistence-service';

export function createOtp(code: string, phone: string): VerificationCode {
  const expirationMinutes = 3;
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + expirationMinutes);

  // Otp database simulation
  // For learning purposes, we are using a JSON file to store the OTPs
  return persistOtp({
    code,
    phone,
    expiresAt,
  });
}

export function verifyOtp(code: string, phone: string) {
  console.log('Verifying OTP', { phone, code });

  const verificationCode = findByPhoneAndCode(phone, code);

  if (verificationCode?.code !== code || verificationCode?.phone !== phone) {
    throw new Error('Invalid or expired Verification Code');
  }

  console.log('OTP verified', { phone, code });

  // If the OTP is valid and has not expired, delete it from the database
  removeByUuid(verificationCode.uuid);
}

export function generateOtpAndSendSms(phone: string) {
  const code = generateOTP(phone);
  const otp = createOtp(code, phone);

  sendSms(otp.phone, otp.code);

  return otp.code;
}

function generateOTP(phone: string) {
  // This function would generate a random 6-digit OTP
  // For the sake of this example, we will just return a static code
  const otp = '111111';
  console.log(`Generating OTP for ${phone} with code ${otp}`);
  return otp;
}

export function sendSms(phone: string, code: string) {
  // This function would send an SMS to the provided phone number
  // For the sake of this example, we will just log the phone and code
  console.log(`Sending SMS to ${phone} with code ${code}`);
}
