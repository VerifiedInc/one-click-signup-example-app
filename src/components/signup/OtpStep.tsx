import { Stack } from '@mui/material';
import {
  Backdrop,
  OTPInput,
  OTPInputInstance,
  ResendPhoneBanner,
  useSnackbar,
} from '@verifiedinc-public/shared-ui-elements';
import { ReactNode, useEffect, useRef, useState } from 'react';
import Title from '../UI/Title';

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
  const [isDisabled, setIsDisabled] = useState<boolean | null>(null);
  const { closeSnackbar } = useSnackbar();

  const handleValidateOtp = async (otpCode: string) => {
    closeSnackbar();
    onValidate(otpCode);
  };

  // This function will update the isDisabled state and clear the otp input
  // It's called when the isLoading state changes
  // It has a delay to do the clear action so the user can see the last inputed digit
  const updateDisableStateAndClearOtp = () => {
    // If the isLoading state is true, we disable the input right away
    if (isLoading) setIsDisabled(true);

    // If the isLoading state is false we add a delay to clear the input
    // the check isDisabled !== null is to avoid the input to be cleared when the component is mounted
    if (
      isDisabled !== null &&
      !isLoading &&
      oneClickSignupSubmitInputRef.current
    ) {
      setTimeout(() => {
        oneClickSignupSubmitInputRef?.current?.clear();
        setIsDisabled(false);
      }, 1000);
    }
  };

  useEffect(updateDisableStateAndClearOtp, [isLoading]);

  return (
    <>
      <Backdrop open={!!isLoading || !!isDisabled} />
      <Stack spacing={3}>
        <Title>Enter your verification code:</Title>
        <OTPInput
          disabled={!!isDisabled}
          ref={oneClickSignupSubmitInputRef}
          onChange={(event: any) => {
            handleValidateOtp(event.target.value);
          }}
        />

        <ResendPhoneBanner
          phone={phone}
          disabled={!!isDisabled}
          onClick={() => {
            onRetryResendOtp(phone);
          }}
        />
      </Stack>
    </>
  );
}
