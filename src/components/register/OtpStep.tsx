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
// Component to render the otp input and the resend phone banner
export default function OtpStep({
  phone,
  onValidate,
  onRetryResendOtp,
  isLoading,
}: OtpStepProps): ReactNode {
  const oneClickSignupSubmitInputRef = useRef<OTPInputInstance | null>(null);

  // State to trigger re-render of otp input
  const [refresh, setRefresh] = useState(false);

  const handleClear = () => {
    setRefresh((prev) => !prev); // Toggle state to trigger re-render
  };

  const handleValidateOtp = async (otpCode: string) => {
    onValidate(otpCode);
    handleClear();
  };

  // Clear the input when the refresh state changes
  // Necessary to make sure the clear will trigger a re-render
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
