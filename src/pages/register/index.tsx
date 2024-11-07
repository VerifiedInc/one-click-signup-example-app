import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';

import { PageHeader } from '@/components/UI/PageHeader';

import {
  requestGenerateOtpAndSendSms,
  requestValidateOtp,
} from '@/services/client/otp-request-service';

import OtpStep from '@/components/register/OtpStep';
import PhoneStep from '@/components/register/PhoneStep';
import SimpleSignupFormStep from '@/components/register/SimpleSignupFormStep';
import { SimpleSignupForm } from '@/components/register/SimpleSignupFormStep/simple-signup.schema';
import SuccessfulSignUpStep from '@/components/register/SuccessfulSignUpStep';
import { Alert, Container, Portal, Snackbar } from '@mui/material';
import { When } from '@verifiedinc-public/shared-ui-elements/components';
import { useDisclosure } from '@verifiedinc-public/shared-ui-elements/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Has all the steps for the registration process
// The components will be rendered according the step state
enum Steps {
  PHONE = 1,
  OTP = 2,
  FORM = 3,
  SUCCESS = 4,
}
function Register() {
  // First step is the phone number form
  const [step, setStep] = useState(Steps.PHONE);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  // This controls whether the snackbar is visible or not
  const disclosure = useDisclosure();
  const [snackbarMessage, setSnackbarMessage] = useState({
    message: '',
    isError: true,
  });
  const router = useRouter();

  // Function to handle the generation of the otp code and send the sms
  // It is called when the user finishes typing the phone number
  const handleGenerateOtpAndSendSms = async (phone: string) => {
    const response = await requestGenerateOtpAndSendSms({ phone });

    if (response?.error) {
      updateSnackbarMessage(response.error, true);
    } else {
      console.log('Enter the otp: 111111');
      setPhone(phone);
      setStep(Steps.OTP);
    }
  };

  // Function to handle the validation of the otp code
  // It is called when the user finishes typing the otp code
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

  // Function to handle the retry resend otp
  // It is called when the user clicks on the resend otp button
  const handleRetryResendOtp = (phone: string) => {
    handleGenerateOtpAndSendSms(phone);
    updateSnackbarMessage('Sms sent successfully');
  };

  // Function to handle the register form submit
  const handleFormSubmit = (data: SimpleSignupForm) => {
    console.log(data);
    setStep(Steps.SUCCESS);
  };

  // Function to reload the page
  const reset = () => {
    router.reload();
  };

  // Function to update the snackbar
  const updateSnackbarMessage = (message: string, isError = false) => {
    setSnackbarMessage({ message, isError });
    disclosure.onOpen();
  };

  // This will render the components according to the step state
  return (
    <>
      <Head page='Register' />
      <PageHeader
        title='Register without 1-click'
        description='This might be Slooow'
      />
      <Container maxWidth='xs' sx={{ py: 3 }}>
        {/* This 'When' component conditionally renders it's children  */}
        <When value={step === Steps.PHONE}>
          <PhoneStep onValidPhone={handleGenerateOtpAndSendSms} />
        </When>

        <When value={step === Steps.OTP}>
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
// This will add the layout to the page
Register.getLayout = MainLayout;

export default Register;
