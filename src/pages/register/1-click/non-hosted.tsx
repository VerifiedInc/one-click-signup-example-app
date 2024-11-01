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
import { useState } from 'react';

function OneClickNonHosted() {
  const [step, setStep] = useState(1);
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

  const handleValidPhone = async (phone: string) => {
    setPhone(phone);
    setIsLoading(true);
    const response: OneClickResponse = await postOneClick({ phone });
    if ('identity' in response) {
      console.log(response.identity.credentials);
      setCredentials(response.identity.credentials);
      await generateOtp(phone);
    } else if (
      response.data?.errorCode ===
      OneClickErrorEnum.ADDITIONAL_INFORMATION_REQUIRED
    ) {
      setStep(2);
    } else {
      updateSnackbarMessage(response.message, true);
    }
    // setStep(2);

    setIsLoading(false);
  };

  const handleValidDob = async (birthDate: string) => {
    setIsLoading(true);
    console.log(birthDate);
    const response = await postOneClick({ phone, birthDate });
    console.log(response);
    setIsLoading(false);
  };

  const generateOtp = async (phone: string) => {
    const response = await requestGenerateOtpAndSendSms({ phone });
    if (response.error) {
      updateSnackbarMessage(response.error, true);
      return;
    }

    setStep(3);
  };

  const handleRetryResendOtp = (phone: string) => {
    updateSnackbarMessage('Sms sent successfully');
    generateOtp(phone);
  };

  const handleValidOtp = async () => {
    setStep(4);
  };

  const handleFormSubmit = (data: SignupOneClickForm) => {
    console.log(data);
    setStep(5);
  };

  const updateSnackbarMessage = (message: string, isError = false) => {
    setSnackbarMessage({ message, isError });
    disclosure.onOpen();
  };

  const reset = () => {
    setStep(1);
    setPhone('');
  };

  return (
    <>
      <Head page='Register' />
      <PageHeader
        title='Register with 1-click Non-Hosted'
        description="It's Slooow, but not slow"
      />
      <Container maxWidth='xs' sx={{ py: 3 }}>
        <When value={step === 1}>
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
        <When value={step === 2}>
          <DobStep onValidDob={handleValidDob} disabled={isLoading} />
        </When>

        <When value={!!phone && step === 3}>
          <OtpStep
            phone={phone}
            onRetryResendOtp={handleRetryResendOtp}
            onValidate={handleValidOtp}
          />
        </When>
        <When value={step === 4}>
          <SignupOneClickFormStep
            onSubmit={handleFormSubmit}
            credentials={credentials}
          />
        </When>
        <When value={step === 5}>
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
