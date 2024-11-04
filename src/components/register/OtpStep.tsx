import { Box } from '@mui/material';
import {
  OTPInput,
  OTPInputInstance,
} from '@verifiedinc/shared-ui-elements/components';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { ResendPhoneBanner } from './ResendPhoneBanner';

interface OtpStepProps {
  phone: string;
  onValidate: (otp: string) => void;
  onRetryResendOtp: (phone: string) => void;
  isLoading?: boolean;
  shouldVerifyOtpIsValid?: boolean;
}

export default function OtpStep({
  phone,
  onValidate,
  onRetryResendOtp,
  isLoading,
}: OtpStepProps): ReactNode {
  const oneClickSignupSubmitInputRef = useRef<OTPInputInstance | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false); // State to trigger re-render of otp input

  const handleClear = () => {
    setRefresh((prev) => !prev); // Toggle state to trigger re-render
  };

  const handleValidateOtp = async (otpCode: string) => {
    onValidate(otpCode);
    handleClear();
  };

  useEffect(() => {
    oneClickSignupSubmitInputRef.current?.clear(); // Clear the input
  }, [refresh]);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <OTPInput
          ref={oneClickSignupSubmitInputRef}
          disabled={isLoading}
          onChange={(event: any) => {
            handleValidateOtp(event.target.value);
          }}
        />
      </Box>

      <ResendPhoneBanner
        phone={phone}
        disabled={isLoading}
        onClick={() => {
          oneClickSignupSubmitInputRef.current?.clear();
          onRetryResendOtp(phone);
        }}
      />
    </Box>
  );
}
