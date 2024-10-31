import { createOtpUseCase } from './otp/createOtpUseCase';

export function generateOtpAndSendSmsUseCase(phone: string) {
  const code = generateOTP(phone);
  const otp = createOtpUseCase(code, phone);

  sendSms(otp.phone, otp.code);

  return otp.code;
}

const sendSms = (phone: string, code: string) => {
  // This function would send an SMS to the provided phone number
  // For the sake of this example, we will just log the phone and code
  console.log(`Sending SMS to ${phone} with code ${code}`);
};

const generateOTP = (phone: string) => {
  // This function would generate a random 6-digit OTP
  // For the sake of this example, we will just return a static code
  const otp = '111111';
  console.log(`Generating OTP for ${phone} with code ${otp}`);
  return otp;
};
