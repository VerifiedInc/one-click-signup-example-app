import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';

import { PageHeader } from '@/components/UI/PageHeader';

import {
  requestGenerateOtpAndSendSms,
  requestValidateOtp,
} from '@/services/client/otp-request-service';

import DobStep from '@/components/signup/DobFormStep';
import LegalLanguage from '@/components/signup/LegalLanguage';
import OtpStep from '@/components/signup/OtpStep';
import PhoneStep from '@/components/signup/PhoneStep';
import SignupOneClickFormStep from '@/components/signup/SignupOneClickFormStep';
import { SignupOneClickForm } from '@/components/signup/SignupOneClickFormStep/signup-one-click.schema';
import SuccessfulSignUpStep from '@/components/signup/SuccessfulSignUpStep';
import { TestPhoneNumbersBanner } from '@/components/signup/TestPhoneNumbersBanner';

import { postOneClick } from '@/services/client/one-click-request-service';
import {
  IntegrationType,
  OneClickCredentials,
  OneClickErrorEnum,
  OneClickPostResponse,
} from '@/types/OneClick.types';
import { Container } from '@mui/material';
import { useSnackbar, When } from '@verifiedinc-public/shared-ui-elements';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { showClipboardSnackbar } from '@/utils/snackbar';

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
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState<OneClickCredentials | null>(
    null,
  );

  // Snackbar hook to manage snackbar messages
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
      enqueueSnackbar(`${otpResponse.error}: ${otpCode}`, 'error', {});
      setIsLoading(false);
      return;
    }

    const response: OneClickPostResponse = await postOneClick(
      IntegrationType['Non-Hosted'],
      { phone },
    );
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
      enqueueSnackbar(
        'data' in response ? response.message : 'An unexpected error happened',
        'error',
      );
    }
    setIsLoading(false);
  };

  // Called when the user finishes typing the dob
  // Will call the postOneClick again and set the credentials
  const handleValidDob = async (birthDate: string) => {
    setIsLoading(true);

    const response = await postOneClick(IntegrationType['Non-Hosted'], {
      phone,
      birthDate,
    });
    if ('identity' in response) {
      setCredentials(response?.identity?.credentials ?? null);
      setStep(Steps.FORM);
    } else {
      enqueueSnackbar(
        'data' in response ? response.message : 'An unexpected error happened',
        'error',
      );
    }

    setIsLoading(false);
  };

  const handleRetryResendOtp = (phone: string) => {
    enqueueSnackbar('SMS sent successfully');
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
      enqueueSnackbar(response.error, 'error');
      return;
    }

    const otp = response?.otp || '111111';
    showClipboardSnackbar(otp, enqueueSnackbar, closeSnackbar);

    setStep(Steps.OTP);
  };

  const reset = () => {
    router.reload();
  };

  return (
    <>
      <Head page='Signup' />
      <PageHeader
        title='1-Click Signup'
        subtitle='(Non-Hosted)'
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

OneClickNonHosted.auth = {};

OneClickNonHosted.getLayout = MainLayout;

export default OneClickNonHosted;
