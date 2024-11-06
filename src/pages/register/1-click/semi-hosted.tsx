import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';

import { PageHeader } from '@/components/UI/PageHeader';

import { requestSendSms } from '@/services/client/otp-request-service';

import DobStep from '@/components/register/DobFormStep';
import OtpStep from '@/components/register/OtpStep';
import PhoneStep from '@/components/register/PhoneStep';
import SignupOneClickFormStep from '@/components/register/SignupOneClickFormStep';
import { SignupOneClickForm } from '@/components/register/SignupOneClickFormStep/signup-one-click.schema';
import SuccessfulSignUpStep from '@/components/register/SuccessfulSignUpStep';
import LegalLanguage from '@/components/UI/LegalLanguage';
import {
  getOneClick,
  patchOneClick,
  postOneClick,
} from '@/services/client/one-click-request-service';
import {
  OneClickCredentials,
  OneClickErrorEnum,
  OneClickPostResponse,
} from '@/types/OneClick.types';
import { Alert, Container, Portal, Snackbar } from '@mui/material';
import { When } from '@verifiedinc/shared-ui-elements/components';
import { useDisclosure } from '@verifiedinc/shared-ui-elements/hooks';
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

function OneClickSemiHosted() {
  // First step is the phone number form
  const [step, setStep] = useState(Steps.PHONE);
  const [phone, setPhone] = useState('');

  // holds the uuid of the one click post request
  // We need this to get the credentials after the first POST request
  const [oneClickPostUuid, setOneClickPostUuid] = useState<string>();

  // This will hold the credentials which will be used to fill the form
  const [credentials, setCredentials] = useState<OneClickCredentials | null>(
    null,
  );
  const [otp, setOtp] = useState<string>();
  const disclosure = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    message: '',
    isError: true,
  });

  const router = useRouter();

  // Function to handle the post request to the one click endpoint
  // It is called when the user finishes typing the phone number
  // With the otp code we can send the sms and validate the otp
  const handleValidPhone = async (phone: string) => {
    setIsLoading(true);
    setPhone(phone);

    const response: OneClickPostResponse = await postOneClick({ phone });
    if ('uuid' in response) {
      console.log('Enter the otp: ', response.code);
      setOtp(response.code);
      setOneClickPostUuid(response.uuid);
      setStep(Steps.OTP);
    } else {
      updateSnackbarMessage(
        'data' in response ? response.message : 'An unexpected error happened',
        true,
      );
    }

    setIsLoading(false);
  };

  // Function to handle the validation of the otp code
  // It is called when the user finishes typing the otp code
  // With the valid otp we can get the credentials on the GET request
  const handleValidOtp = async (userInputedOtp?: string) => {
    setIsLoading(true);
    const response = await getOneClick(
      oneClickPostUuid as string,
      userInputedOtp as string,
    );
    console.log(response);
    // If the response contains credentials we can show the form
    if ('credentials' in response) {
      setCredentials(response?.credentials ?? null);
      setStep(Steps.FORM);

      // If the response contains ADDITIONAL_INFORMATION_REQUIRED we need to ask for the dob
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

  // Function to handle the validation of the dob
  // It is called when the user finishes typing the dob
  // With the valid dob we can patch the one click endpoint and get the credentials
  const handleValidDob = async (birthDate: string) => {
    setIsLoading(true);

    const response = await patchOneClick(oneClickPostUuid as string, {
      birthDate,
    });
    console.log(response);
    if ('credentials' in response) {
      setCredentials(response?.credentials ?? null);
      console.log(response?.credentials);
      setStep(Steps.FORM);
    } else {
      updateSnackbarMessage(
        'data' in response ? response.message : 'An unexpected error happened',
        true,
      );
    }

    setIsLoading(false);
  };

  // Function to handle the retry resend otp
  // It is called when the user clicks on the resend otp button
  const handleRetryResendOtp = (phone: string) => {
    resendSms(phone);
  };

  // Function to handle the register form submit
  // It is called when the user finishes filling the form
  const handleFormSubmit = (data: SignupOneClickForm) => {
    console.log(data);
    setStep(Steps.SUCCESS);
  };

  // Function to resend the sms
  const resendSms = async (phone: string) => {
    const response = await requestSendSms({ phone, otp: otp as string });
    if (response.error) {
      updateSnackbarMessage(response.error, true);
      return;
    }
    updateSnackbarMessage('Sms sent successfully');
    setStep(Steps.OTP);
  };

  const updateSnackbarMessage = (message: string, isError = false) => {
    setSnackbarMessage({ message, isError });
    disclosure.onOpen();
  };

  // Function to reload the page
  const reset = () => {
    router.reload();
  };

  return (
    <>
      <Head page='Register' />
      <PageHeader
        title='1-click Semi-Hosted Register'
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
            shouldVerifyOtpIsValid={false}
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

OneClickSemiHosted.auth = {};

OneClickSemiHosted.getLayout = MainLayout;

export default OneClickSemiHosted;
