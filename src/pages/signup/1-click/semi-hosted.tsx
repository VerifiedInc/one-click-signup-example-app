import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';

import { PageHeader } from '@/components/UI/PageHeader';

import { requestSendSms } from '@/services/client/otp-request-service';

import DobStep from '@/components/signup/DobFormStep';
import LegalLanguage from '@/components/signup/LegalLanguage';
import OtpStep from '@/components/signup/OtpStep';
import PhoneStep from '@/components/signup/PhoneStep';
import SignupOneClickFormStep from '@/components/signup/SignupOneClickFormStep';
import { SignupOneClickForm } from '@/components/signup/SignupOneClickFormStep/signup-one-click.schema';
import SuccessfulSignUpStep from '@/components/signup/SuccessfulSignUpStep';
import { TestPhoneNumbersBanner } from '@/components/signup/TestPhoneNumbersBanner';
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
import { showClipboardSnackbar } from '@/utils/snackbar';
import { Container } from '@mui/material';
import { useSnackbar, When } from '@verifiedinc-public/shared-ui-elements';
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
  const [isLoading, setIsLoading] = useState(false);

  // Snackbar hook to manage snackbar messages
  const { updateSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();

  // Function to handle the post request to the one click endpoint
  // It is called when the user finishes typing the phone number
  // With the otp code we can send the sms and validate the otp
  const handleValidPhone = async (phone: string) => {
    setIsLoading(true);
    setPhone(phone);

    const response: OneClickPostResponse = await postOneClick({ phone });
    if ('uuid' in response) {
      const otp = response?.code as string;
      showClipboardSnackbar(otp, updateSnackbar, closeSnackbar);
      setOtp(response.code);
      setOneClickPostUuid(response.uuid);
      setStep(Steps.OTP);
    } else {
      updateSnackbar(
        'data' in response ? response.message : 'An unexpected error happened',
        'error',
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
      updateSnackbar(
        'data' in response ? response.message : 'An unexpected error happened',
        'error',
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
      updateSnackbar(
        'data' in response ? response.message : 'An unexpected error happened',
        'error',
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
      updateSnackbar(response.error, 'error');
      return;
    }

    showClipboardSnackbar(otp as string, updateSnackbar, closeSnackbar);
    updateSnackbar('SMS sent successfully');
    setStep(Steps.OTP);
  };

  // Function to reload the page
  const reset = () => {
    router.reload();
  };

  return (
    <>
      <Head page='Signup' />
      <PageHeader
        title='1-Click Signup'
        subtitle='(Semi-Hosted)'
        description='This is Slooow, but not slooow!'
      />
      <Container maxWidth='xs'>
        <When value={step === Steps.PHONE}>
          <PhoneStep onValidPhone={handleValidPhone} disabled={isLoading} />
          <LegalLanguage />
          <TestPhoneNumbersBanner />
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
    </>
  );
}

OneClickSemiHosted.auth = {};

OneClickSemiHosted.getLayout = MainLayout;

export default OneClickSemiHosted;
