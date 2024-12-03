import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';

import { PageHeader } from '@/components/UI/PageHeader';

import {
  requestGenerateOtpAndSendSms,
  requestValidateOtp,
} from '@/services/client/otp-request-service';

import OtpStep from '@/components/signup/OtpStep';
import PhoneStep from '@/components/signup/PhoneStep';
import SimpleSignupFormStep from '@/components/signup/SimpleSignupFormStep';
import { SimpleSignupForm } from '@/components/signup/SimpleSignupFormStep/simple-signup.schema';
import SuccessfulSignUpStep from '@/components/signup/SuccessfulSignUpStep';

import { useSteps } from '@/hooks/useSteps';
import { showClipboardSnackbar } from '@/utils/snackbar';
import { Container } from '@mui/material';
import { useSnackbar, When } from '@verifiedinc-public/shared-ui-elements';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Has all the steps for the registration process
// The components will be rendered according the step state

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');

  // Snackbar hook to manage snackbar messages
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  // Custom hook to manage the steps of the application
  const { Steps, step, setStep } = useSteps();

  const router = useRouter();

  // Function to handle the generation of the otp code and send the sms
  // It is called when the user finishes typing the phone number
  const handleGenerateOtpAndSendSms = async (phone: string) => {
    const response = await requestGenerateOtpAndSendSms({ phone });

    if (response?.error) {
      enqueueSnackbar(response.error, 'error');
    } else {
      const otp = response?.otp || '111111';
      showClipboardSnackbar(otp, enqueueSnackbar, closeSnackbar);
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
      enqueueSnackbar(`${otpResponse.error}: ${otpCode}`, 'error');
    } else {
      setStep(Steps.FORM);
    }
    setIsLoading(false);
  };

  // Function to handle the retry resend otp
  // It is called when the user clicks on the resend otp button
  const handleRetryResendOtp = (phone: string) => {
    handleGenerateOtpAndSendSms(phone);
    enqueueSnackbar('SMS sent successfully');
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

  // This will render the components according to the step state
  return (
    <>
      <Head page='Signup' />
      <PageHeader
        title='Manual Signup'
        description={
          step === Steps.SUCCESS
            ? 'Wasn’t that slooow?!'
            : 'This will be slooow...'
        }
      />
      <Container maxWidth='xs'>
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
    </>
  );
}
// This will add the layout to the page
Signup.getLayout = MainLayout;

export default Signup;
