import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';

import { PageHeader } from '@/components/UI/PageHeader';

import { requestGenerateOtpAndSendSms } from '@/services/client/otp-request-service';

import { Alert, Container, Link, Portal, Snackbar } from '@mui/material';
import {
  Image,
  Typography,
  When,
} from '@verifiedinc/shared-ui-elements/components';
import { useDisclosure } from '@verifiedinc/shared-ui-elements/hooks';
import { useState } from 'react';
import { postOneClick } from '@/services/client/one-click-request-service';
import OtpComponent from '@/components/otp/OtpComponent';
import FormWithoutIntegration from '@/components/register/FormWithoutIntegration';
import PhoneComponent from '@/components/register/PhoneComponent';
import SuccessfulSignUpComponent from '@/components/register/SuccessfulSignUpComponent';

function OneClickNonHosted() {
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

  const handleValidateOtp = async () => {
    const response = await postOneClick({
      phone,
    });

    console.log(response);

    setStep(3);
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
        title='Register with 1-click Non-Hosted'
        description="It's Slooow, but not slow"
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
          <PhoneComponent onValidPhone={handleGenerateOtpAndSendSms}>
            <Image
              src={'/verified-gray.svg'}
              alt={'1-click sign up powered by verified'}
              maxWidth='200px'
              component='img'
              sx={{ my: 1 }}
            />
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
          </PhoneComponent>
        </When>

        <When value={!!phone && step === 2}>
          <OtpComponent
            phone={phone}
            onRetryResendOtp={handleRetryResendOtp}
            onValidate={handleValidateOtp}
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

OneClickNonHosted.auth = {};

OneClickNonHosted.getLayout = MainLayout;

export default OneClickNonHosted;
