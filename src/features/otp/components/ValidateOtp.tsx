import { Alert, Portal, Snackbar, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  AcceptTermsNotice,
  OTPInput,
  OTPInputInstance,
} from '@verifiedinc/shared-ui-elements/components';
import { wrapPromise } from '@verifiedinc/shared-ui-elements/utils';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useValidateOtp } from '../hooks/useValidateOtp';
import { useDisclosure } from '../hooks/useDisclosure';
import { useGenerateOtpAndSendSms } from '../hooks/useGenerateOtpAndSendSms';

interface ValidateOtpProps {
  otpCode: string;
  onValidate: () => void;
}

function ValidateOtp({ otpCode, onValidate }: ValidateOtpProps): ReactNode {
  const theme = useTheme();
  const router = useRouter();
  const oneClickSignupSubmitInputRef = useRef<OTPInputInstance | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const errorDisclosure = useDisclosure();

  const { isPending, ...requestValidateOtp } = useValidateOtp();
  const { isPending: isPendingGeneration, ...generateOtpAndSendSms } =
    useGenerateOtpAndSendSms();

  const handleGenerateOtpAndSendSms = async () => {
    const [responseData] = await wrapPromise(
      generateOtpAndSendSms
        .mutateAsync({
          phone: '+10123456789',
        })
        .then((response) => response.json()),
    );

    if (responseData?.error) {
      setErrorMessage(responseData.error);
      errorDisclosure.onOpen();
    }
  };

  const handleValidateOtp = async (otpCode: string) => {
    const [responseData] = await wrapPromise(
      requestValidateOtp
        .mutateAsync({
          phone: '+10123456789',
          otpCode,
        })
        .then((response) => response.json()),
    );

    if (responseData?.error) {
      setErrorMessage(responseData.error);
      errorDisclosure.onOpen();
    } else {
      onValidate();
    }
  };

  useEffect(() => {
    handleGenerateOtpAndSendSms();
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }
    oneClickSignupSubmitInputRef.current?.clear();
  }, [errorMessage]);

  return (
    <Stack direction='column' alignItems='center' mx='auto' width='100%'>
      <Stack direction='row' justifyContent='center' mt={3}>
        <OTPInput
          ref={oneClickSignupSubmitInputRef}
          disabled={isPending || isPendingGeneration}
          onChange={(event: any) => {
            handleValidateOtp(event.target.value);
            oneClickSignupSubmitInputRef.current?.clear();
          }}
        />
      </Stack>
      <Stack direction='row' justifyContent='center' mt={3}>
        <AcceptTermsNotice />
      </Stack>
      <Portal>
        <Snackbar open={errorDisclosure.open} onClose={errorDisclosure.onClose}>
          <Alert variant='standard' severity='error'>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Portal>
    </Stack>
  );
}

export default React.memo(ValidateOtp);
