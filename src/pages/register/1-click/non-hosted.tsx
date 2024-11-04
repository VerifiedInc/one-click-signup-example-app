import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';

import { PageHeader } from '@/components/UI/PageHeader';

import { requestGenerateOtpAndSendSms } from '@/services/client/otp-request-service';

import DobStep from '@/components/register/DobFormStep';
import OtpStep from '@/components/register/OtpStep';
import PhoneStep from '@/components/register/PhoneStep';
import SignupOneClickFormStep from '@/components/register/SignupOneClickFormStep';
import { SignupOneClickForm } from '@/components/register/SignupOneClickFormStep/signup-one-click.schema';
import SuccessfulSignUpStep from '@/components/register/SuccessfulSignUpStep';
import { postOneClick } from '@/services/client/one-click-request-service';
import {
  OneClickCredentials,
  OneClickErrorEnum,
  OneClickResponse,
} from '@/types/OneClick.types';
import { Alert, Container, Link, Portal, Snackbar } from '@mui/material';
import { Typography, When } from '@verifiedinc/shared-ui-elements/components';
import { useDisclosure } from '@verifiedinc/shared-ui-elements/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';

enum Steps {
  PHONE = 1,
  OTP = 2,
  DOB = 3,
  FORM = 4,
  SUCCESS = 5,
}

function OneClickNonHosted() {
  const [step, setStep] = useState(Steps.PHONE);
  const [phone, setPhone] = useState('');
  const disclosure = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState<OneClickCredentials | null>(
    null,
  );
  const [snackbarMessage, setSnackbarMessage] = useState({
    message: '',
    isError: true,
  });

  const router = useRouter();

  const handleValidPhone = async (phone: string) => {
    setPhone(phone);
    setIsLoading(true);
    await generateOtp(phone);
    setIsLoading(false);
  };

  const handleValidOtp = async () => {
    setIsLoading(true);
    const response: OneClickResponse = await postOneClick({ phone });
    if ('identity' in response) {
      setCredentials(response?.identity?.credentials ?? null);
      setStep(Steps.FORM);
    } else if (
      'data' in response &&
      response.data?.errorCode ===
        OneClickErrorEnum.ADDITIONAL_INFORMATION_REQUIRED
    ) {
      setStep(Steps.DOB);
    } else {
      updateSnackbarMessage(
        'data' in response ? response.message : 'An unexpected error happened',
        true,
      );
    }
    setIsLoading(false);
  };

  const handleValidDob = async (birthDate: string) => {
    setIsLoading(true);

    const response = await postOneClick({ phone, birthDate });
    if ('identity' in response) {
      setCredentials(response?.identity?.credentials ?? null);
      setStep(Steps.FORM);
    } else {
      updateSnackbarMessage(
        'data' in response ? response.message : 'An unexpected error happened',
        true,
      );
    }

    setIsLoading(false);
  };

  const handleRetryResendOtp = (phone: string) => {
    updateSnackbarMessage('Sms sent successfully');
    generateOtp(phone);
  };

  const handleFormSubmit = (data: SignupOneClickForm) => {
    console.log(data);
    setStep(5);
  };

  const generateOtp = async (phone: string) => {
    const response = await requestGenerateOtpAndSendSms({ phone });
    if (response.error) {
      updateSnackbarMessage(response.error, true);
      return;
    }

    setStep(Steps.OTP);
  };

  const updateSnackbarMessage = (message: string, isError = false) => {
    setSnackbarMessage({ message, isError });
    disclosure.onOpen();
  };

  const reset = () => {
    router.reload();
  };

  return (
    <>
      <Head page='Register' />
      <PageHeader
        title='Register with 1-click Non-Hosted'
        description="It's Slooow, but not slow"
      />
      <Container maxWidth='xs' sx={{ py: 3 }}>
        <When value={step === Steps.PHONE}>
          <PhoneStep onValidPhone={handleValidPhone} disabled={isLoading}>
            <Typography variant='body2' color='textSecondary'>
              By entering your phone number, you agree to create a Verified
              account for 1-Click Signup at Slooow and other supported sites,
              and you agree to Verified's{' '}
              <Link
                color='primary'
                href='https://verified.inc/legal#terms-of-use'
              >
                Terms of Use.
              </Link>
            </Typography>
          </PhoneStep>
        </When>

        <When value={!!phone && step === Steps.OTP}>
          <OtpStep
            phone={phone}
            onRetryResendOtp={handleRetryResendOtp}
            onValidate={handleValidOtp}
            isLoading={isLoading}
          />
        </When>

        <When value={step === Steps.DOB}>
          <DobStep onValidDob={handleValidDob} disabled={isLoading} />
        </When>

        <When value={step === Steps.FORM}>
          <SignupOneClickFormStep
            onSubmit={handleFormSubmit}
            credentials={credentials}
          />
        </When>
        <When value={step === Steps.SUCCESS}>
          <SuccessfulSignUpStep onSignOut={reset} />
        </When>
      </Container>
      <Portal>
        <Snackbar open={disclosure.open} onClose={disclosure.onClose}>
          <Alert severity={snackbarMessage.isError ? 'error' : 'success'}>
            {snackbarMessage.message}
          </Alert>
        </Snackbar>
      </Portal>
    </>
  );
}

OneClickNonHosted.auth = {};

OneClickNonHosted.getLayout = MainLayout;

export default OneClickNonHosted;
