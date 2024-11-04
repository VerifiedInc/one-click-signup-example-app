import { requestValidateOtp } from '@/services/client/otp-request-service';
import { Box } from '@mui/material';
import {
  FullWidthAlert,
  OTPInput,
  OTPInputInstance,
} from '@verifiedinc/shared-ui-elements/components';
import { ReactNode, useRef, useState } from 'react';
import { ResendPhoneBanner } from './ResendPhoneBanner';

interface OtpStepProps {
  phone: string;
  onValidate: () => void;
  onRetryResendOtp: (phone: string) => void;
  isLoading?: boolean;
}

export default function OtpStep({
  phone,
  onValidate,
  onRetryResendOtp,
  isLoading,
}: OtpStepProps): ReactNode {
  const oneClickSignupSubmitInputRef = useRef<OTPInputInstance | null>(null);
  const [isPending, setIsPending] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isDisabled = isPending || isLoading;

  const handleValidateOtp = async (otpCode: string) => {
    setIsPending(true);
    const response = await requestValidateOtp({ otpCode, phone });

    if (response?.error) {
      setErrorMessage(`${response.error}: ${otpCode}`);
      oneClickSignupSubmitInputRef.current?.clear();
    } else {
      onValidate();
    }
    setIsPending(false);
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <OTPInput
          ref={oneClickSignupSubmitInputRef}
          disabled={isDisabled}
          onChange={(event: any) => {
            handleValidateOtp(event.target.value);
          }}
        />
      </Box>

      <ResendPhoneBanner
        phone={phone}
        disabled={isDisabled}
        onClick={() => {
          oneClickSignupSubmitInputRef.current?.clear();
          onRetryResendOtp(phone);
        }}
      />
      {errorMessage && (
        <FullWidthAlert
          title='Error Authenticating'
          severity='error'
          sx={{ mt: 1 }}
        >
          {errorMessage}
        </FullWidthAlert>
      )}
    </Box>
  );
}
