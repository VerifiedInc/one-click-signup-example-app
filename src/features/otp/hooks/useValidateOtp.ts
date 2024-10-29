import { path } from '@/pages/api/otp/verify-otp';
import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query';

interface Payload {
  otpCode: string;
  phone: string;
}

export function useValidateOtp(
  options: MutationOptions<Response, Error, Payload> = {},
) {
  return useMutation<Response, Error, Payload>({
    mutationKey: ['otp-validate'],
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
