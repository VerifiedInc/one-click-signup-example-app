import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';

import { PageHeader } from '@/components/UI/PageHeader';
import OtpComponent from '@/features/otp/components/OtpComponent';
import { requestGenerateOtpAndSendSms } from '@/features/otp/otpClient';
import FormWithoutIntegration from '@/features/register/components/FormWithoutIntegration';
import PhoneComponent from '@/features/register/components/PhoneComponent';
import SuccessfulSignUpComponent from '@/features/register/components/SuccessfulSignUpComponent';
import { Alert, Container, Portal, Snackbar } from '@mui/material';
import { Image, When } from '@verifiedinc/shared-ui-elements/components';
import { useDisclosure } from '@verifiedinc/shared-ui-elements/hooks';
import { useState } from 'react';

function Register() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const disclosure = useDisclosure();
  const [isPending, setIsPending] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    message: '',
    isError: true,
  });

  const updateSnackbarMessage = (message: string, isError = false) => {
    setSnackbarMessage({ message, isError });
    disclosure.onOpen();
  };

  const handleGenerateOtpAndSendSms = async (phone: string) => {
    setIsPending(true);
    const response = await requestGenerateOtpAndSendSms({ phone });

    if (response?.error) {
      updateSnackbarMessage(response.error, true);
    } else {
      setPhone(phone);
      setStep(2);
    }
    setIsPending(false);
  };

  const handleRetryResendOtp = (phone: string) => {
    handleGenerateOtpAndSendSms(phone);
    updateSnackbarMessage('Sms sent successfully');
  };

  const handleFormSubmit = (data: FormWithoutIntegration) => {
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
          <Image
            src={'/slooow.png'}
            alt={'logo'}
            maxWidth='200px'
            component='img'
            sx={{ pb: 3 }}
          />
          <PhoneComponent onValidPhone={handleGenerateOtpAndSendSms} />
        </When>

        <When value={!!phone && step === 2}>
          <OtpComponent
            phone={phone}
            onRetryResendOtp={handleRetryResendOtp}
            onValidate={() => setStep(3)}
          />
        </When>
        <When value={step === 3}>
          <FormWithoutIntegration onSubmit={handleFormSubmit} />
        </When>
        <When value={step === 4}>
          <SuccessfulSignUpComponent onSignOut={reset} />
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
