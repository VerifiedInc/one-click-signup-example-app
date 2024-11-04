import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';

import { PageHeader } from '@/components/UI/PageHeader';

import {
  requestGenerateOtpAndSendSms,
  requestValidateOtp,
} from '@/services/client/otp-request-service';

import SimpleSignupFormStep from '@/components/register/SimpleSignupFormStep';
import { SimpleSignupForm } from '@/components/register/SimpleSignupFormStep/simple-signup.schema';
import OtpStep from '@/components/register/OtpStep';
import PhoneStep from '@/components/register/PhoneStep';
import SuccessfulSignUpStep from '@/components/register/SuccessfulSignUpStep';
import { Alert, Container, Portal, Snackbar } from '@mui/material';
import { Image, When } from '@verifiedinc/shared-ui-elements/components';
import { useDisclosure } from '@verifiedinc/shared-ui-elements/hooks';
import { useState } from 'react';
import { useRouter } from 'next/router';

enum Steps {
  PHONE = 1,
  OTP = 2,
  FORM = 3,
  SUCCESS = 4,
}
function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(Steps.PHONE);
  const [phone, setPhone] = useState('');
  const disclosure = useDisclosure();
  const [snackbarMessage, setSnackbarMessage] = useState({
    message: '',
    isError: true,
  });

  const updateSnackbarMessage = (message: string, isError = false) => {
    setSnackbarMessage({ message, isError });
    disclosure.onOpen();
  };

  const handleGenerateOtpAndSendSms = async (phone: string) => {
    const response = await requestGenerateOtpAndSendSms({ phone });

    if (response?.error) {
      updateSnackbarMessage(response.error, true);
    } else {
      setPhone(phone);
      setStep(Steps.OTP);
    }
  };

  const handleValidateOtp = async (otpCode: string) => {
    setIsLoading(true);
    const otpResponse = await requestValidateOtp({ otpCode, phone });
    if (otpResponse?.error) {
      updateSnackbarMessage(`${otpResponse.error}: ${otpCode}`, true);
    } else {
      setStep(Steps.FORM);
    }
    setIsLoading(false);
  };

  const handleRetryResendOtp = (phone: string) => {
    handleGenerateOtpAndSendSms(phone);
    updateSnackbarMessage('Sms sent successfully');
  };

  const handleFormSubmit = (data: SimpleSignupForm) => {
    console.log(data);
    setStep(Steps.SUCCESS);
  };

  const reset = () => {
    router.reload();
  };

  return (
    <>
      <Head page='Register' />
      <PageHeader
        title='Register without 1-click'
        description='This might be Slooow'
      />
      <Container maxWidth='xs' sx={{ py: 3 }}>
        <When value={step === Steps.PHONE}>
          <PhoneStep onValidPhone={handleGenerateOtpAndSendSms} />
        </When>

        <When value={!!phone && step === Steps.OTP}>
          <OtpStep
            phone={phone}
            onRetryResendOtp={handleRetryResendOtp}
            onValidate={handleValidateOtp}
            isLoading={isLoading}
          />
        </When>
        <When value={step === Steps.FORM}>
          <SimpleSignupFormStep onSubmit={handleFormSubmit} />
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

Register.auth = {};

Register.getLayout = MainLayout;

export default Register;
