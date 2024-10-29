import { path } from '@/pages/api/generate-otp-and-send-sms';
import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query';

interface Payload {
  phone: string;
}

export function useGenerateOtpAndSendSms(
  options: MutationOptions<Response, Error, Payload> = {},
) {
  return useMutation<Response, Error, Payload>({
    mutationKey: ['otp-generate-and-send-sms'],
    mutationFn: async (payload) => {
      return fetch(path(), {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    ...options,
  });
}
