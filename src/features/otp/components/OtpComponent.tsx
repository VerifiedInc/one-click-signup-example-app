import { ResendPhoneBanner } from '@/features/register/components/ResendPhoneBanner';
import { Box } from '@mui/material';
import {
  FullWidthAlert,
  OTPInput,
  OTPInputInstance,
} from '@verifiedinc/shared-ui-elements/components';
import { wrapPromise } from '@verifiedinc/shared-ui-elements/utils';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useValidateOtp } from '../hooks/useValidateOtp';

interface OtpComponentProps {
  phone: string;
  onValidate: () => void;
  onRetryResendOtp: (phone: string) => void;
  isLoading?: boolean;
}

function OtpComponent({
  phone,
  onValidate,
  onRetryResendOtp,
  isLoading,
}: OtpComponentProps): ReactNode {
  const oneClickSignupSubmitInputRef = useRef<OTPInputInstance | null>(null);

  const { isPending, ...requestValidateOtp } = useValidateOtp();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isDisabled = isPending || isLoading;

  const handleValidateOtp = async (otpCode: string) => {
    const [responseData] = await wrapPromise(
      requestValidateOtp
        .mutateAsync({
          phone: phone,
          otpCode,
        })
        .then((response) => response.json()),
    );

    if (responseData?.error) {
      setErrorMessage(responseData.error);
    } else {
      onValidate();
    }
  };

  useEffect(() => {
    if (!errorMessage) {
      return;
    }
    oneClickSignupSubmitInputRef.current?.clear();
  }, [errorMessage]);

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

export default OtpComponent;
