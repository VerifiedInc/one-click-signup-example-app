/**
 * Make OTP related requests to next API
 * @see https://nextjs.org/docs/pages/building-your-application/routing/api-routes
 */

const headers = {
  'Content-Type': 'application/json',
};

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

export const requestGenerateOtpAndSendSms = async (payload: {
  phone: string;
}): Promise<{ error?: string }> => {
  return fetch('/api/generate-otp-and-send-sms', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers,
  }).then((response) => response.json());
};
