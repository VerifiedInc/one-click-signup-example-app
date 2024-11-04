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

enum Steps {
  PHONE = 1,
  OTP = 2,
  DOB = 3,
  FORM = 4,
  SUCCESS = 5,
}

function OneClickSemiHosted() {
  const [step, setStep] = useState(Steps.PHONE);
  const [phone, setPhone] = useState('');
  const [oneClickPostUuid, setOneClickPostUuid] = useState<string>();
  const [otp, setOtp] = useState<string>();
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

  const handleValidPhone = async (phone: string) => {
    setIsLoading(true);
    setPhone(phone);

    const response: OneClickPostResponse = await postOneClick({ phone });
    console.log(response);
    if ('uuid' in response) {
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

  const handleValidOtp = async (userInputedOtp?: string) => {
    setIsLoading(true);
    const response = await getOneClick(
      oneClickPostUuid as string,
      userInputedOtp as string,
    );

    if ('credentials' in response) {
      setCredentials(response?.credentials ?? null);
      setStep(Steps.FORM);
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

  const handleValidDob = async (birthDate: string) => {
    setIsLoading(true);

    const response = await patchOneClick(oneClickPostUuid as string, {
      birthDate,
    });
    if ('credentials' in response) {
      setCredentials(response?.credentials ?? null);
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
    resendSms(phone);
  };

  const handleFormSubmit = (data: SignupOneClickForm) => {
    console.log(data);
    setStep(5);
  };

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

        <When value={!!phone && step === Steps.OTP}>
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
