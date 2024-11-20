/**
 * Make OTP related requests to next API
 * @see https://nextjs.org/docs/pages/building-your-application/routing/api-routes
 */

const headers = {
  'Content-Type': 'application/json',
};

// Request to next API to validate the Verification Code
// You can see the implementation in src/pages/api/verify-otp.ts
export const requestValidateOtp = async (payload: {
  otpCode: string;
  phone: string;
}): Promise<{ error?: string; message?: string }> => {
  return fetch('/api/verify-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
  }).then((response) => response.json());
};

// Request to next API to generate the Verification Code and send the SMS
// You can see the implementation in src/pages/api/generate-otp-and-send-sms.ts
export const requestGenerateOtpAndSendSms = async (payload: {
  phone: string;
}): Promise<{
  otp: string;
  error?: string;
}> => {
  return fetch('/api/generate-otp-and-send-sms', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
  }).then((response) => response.json());
};

// Request to next API to send the SMS
// You can see the implementation in src/pages/api/send-sms.ts
export const requestSendSms = async (payload: {
  phone: string;
  otp: string;
}): Promise<{ error?: string }> => {
  console.log(payload);
  return fetch('/api/send-sms', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
  }).then((response) => response.json());
};
