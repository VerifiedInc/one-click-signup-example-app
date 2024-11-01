import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';

import { PageHeader } from '@/components/UI/PageHeader';

import { requestGenerateOtpAndSendSms } from '@/services/client/otp-request-service';

import SimpleSignupFormStep from '@/components/register/SimpleSignupFormStep';
import { SimpleSignupForm } from '@/components/register/SimpleSignupFormStep/simple-signup.schema';
import OtpStep from '@/components/register/OtpStep';
import PhoneStep from '@/components/register/PhoneStep';
import SuccessfulSignUpStep from '@/components/register/SuccessfulSignUpStep';
import { Alert, Container, Portal, Snackbar } from '@mui/material';
import { Image, When } from '@verifiedinc/shared-ui-elements/components';
import { useDisclosure } from '@verifiedinc/shared-ui-elements/hooks';
import { useState } from 'react';

function Register() {
  const [step, setStep] = useState(1);
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
      setStep(2);
    }
  };

  const handleRetryResendOtp = (phone: string) => {
    handleGenerateOtpAndSendSms(phone);
    updateSnackbarMessage('Sms sent successfully');
  };

  const handleFormSubmit = (data: SimpleSignupForm) => {
    console.log(data);
    setStep(4);
  };

  const reset = () => {
    setStep(1);
    setPhone('');
  };

  return (
    <>
      <Head page='Register' />
      <PageHeader
        title='Register without 1-click'
        description='This might be Slooow'
      />
      <Container maxWidth='xs' sx={{ py: 3 }}>
        <When value={step === 1}>
          <PhoneStep onValidPhone={handleGenerateOtpAndSendSms} />
        </When>

        <When value={!!phone && step === 2}>
          <OtpStep
            phone={phone}
            onRetryResendOtp={handleRetryResendOtp}
            onValidate={() => setStep(3)}
          />
        </When>
        <When value={step === 3}>
          <SimpleSignupFormStep onSubmit={handleFormSubmit} />
        </When>
        <When value={step === 4}>
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
