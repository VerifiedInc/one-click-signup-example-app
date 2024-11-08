import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';

import { PageHeader } from '@/components/UI/PageHeader';

import {
  requestGenerateOtpAndSendSms,
  requestValidateOtp,
} from '@/services/client/otp-request-service';

import DobStep from '@/components/register/DobFormStep';
import OtpStep from '@/components/register/OtpStep';
import PhoneStep from '@/components/register/PhoneStep';
import SignupOneClickFormStep from '@/components/register/SignupOneClickFormStep';
import { SignupOneClickForm } from '@/components/register/SignupOneClickFormStep/signup-one-click.schema';
import SuccessfulSignUpStep from '@/components/register/SuccessfulSignUpStep';
import LegalLanguage from '@/components/UI/LegalLanguage';
import { postOneClick } from '@/services/client/one-click-request-service';
import {
  OneClickCredentials,
  OneClickErrorEnum,
  OneClickPostResponse,
} from '@/types/OneClick.types';
import { Alert, Container, Portal, Snackbar } from '@mui/material';
import { useDisclosure, When } from '@verifiedinc-public/shared-ui-elements';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Has all the steps for the registration process
// The components will be rendered according the step state
enum Steps {
  PHONE = 1,
  OTP = 2,
  DOB = 3,
  FORM = 4,
  SUCCESS = 5,
}

function OneClickNonHosted() {
  // First step is the phone number form
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

  // Called when the user finishes typing the phone number
  const handleValidPhone = async (phone: string) => {
    setPhone(phone);
    setIsLoading(true);
    await generateOtp(phone);
    setIsLoading(false);
  };

  // Called when the user finishes typing the otp code
  // Will validate the otp code
  // If the otp code is valid, it will call the postOneClick and set the credentials
  const handleValidOtp = async (otpCode: string) => {
    setIsLoading(true);

    const otpResponse = await requestValidateOtp({ otpCode, phone });
    if (otpResponse?.error) {
      updateSnackbarMessage(`${otpResponse.error}: ${otpCode}`, true);
      setIsLoading(false);
      return;
    }

    const response: OneClickPostResponse = await postOneClick({ phone });
    console.log(response);
    if ('identity' in response) {
      setCredentials(response?.identity?.credentials ?? null);
      setStep(Steps.FORM);

      // If the response has the errorCode ADDITIONAL_INFORMATION_REQUIRED it means that we need to ask for the DOB
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

  // Called when the user finishes typing the dob
  // Will call the postOneClick again and set the credentials
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

  // Function to generate the otp code and send the sms
  const generateOtp = async (phone: string) => {
    const response = await requestGenerateOtpAndSendSms({ phone });
    if (response.error) {
      updateSnackbarMessage(response.error, true);
      return;
    }

    setStep(Steps.OTP);
    console.log('Enter the otp: 111111');
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
            <LegalLanguage />
          </PhoneStep>
        </When>

        <When value={step === Steps.OTP}>
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
