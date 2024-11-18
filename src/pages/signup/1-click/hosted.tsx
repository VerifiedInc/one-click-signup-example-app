import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';

import { PageHeader } from '@/components/UI/PageHeader';

import { requestSendSms } from '@/services/client/otp-request-service';

import LegalLanguage from '@/components/signup/LegalLanguage';
import PhoneStep from '@/components/signup/PhoneStep';
import SuccessfulSignUpStep from '@/components/signup/SuccessfulSignUpStep';
import {
  getOneClick,
  postOneClick,
} from '@/services/client/one-click-request-service';
import { OneClickPostResponse } from '@/types/OneClick.types';
import { Container } from '@mui/material';
import { useSnackbar, When } from '@verifiedinc-public/shared-ui-elements';

import LoadingSpinner from '@/components/UI/LoadingSpinner';

import RedirectStep from '@/components/signup/RedirectStep';
import { TestPhoneNumbersBanner } from '@/components/signup/TestPhoneNumbersBanner';
import { showClipboardSnackbar } from '@/utils/snackbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Has all the steps for the registration process
// The components will be rendered according the step state
enum Steps {
  LOADING = 1,
  PHONE = 2,
  REDIRECT = 3,
  SUCCESS = 4,
}

function OneClickHosted() {
  const [step, setStep] = useState(Steps.LOADING);
  const [isLoading, setIsLoading] = useState(false);

  // Snackbar hook to manage snackbar messages
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();

  // Function to call the one click post endpoint
  // It is called when the user finishes typing the phone number
  // It will redirect the user to the web wallet where the user will finish the registration
  // If the NEXT_PUBLIC_REDIRECT_URL is set, the user will be redirected back to this page once the registration is done
  // Otherwise, the user will be redirected to the brand's default redirect url
  const handleValidPhone = async (phone: string) => {
    setIsLoading(true);

    const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;
    const response: OneClickPostResponse = await postOneClick({
      phone,
      content: { title: 'Signup', description: 'Signup to Slooow' },
      redirectUrl: redirectUrl
        ? `${process.env.NEXT_PUBLIC_REDIRECT_URL}/register/1-click/hosted`
        : undefined,
    });
    console.log(response);
    if ('url' in response) {
      sendSmsAndRedirect(
        phone,
        response.code as string,
        response.url as string,
      );
    } else {
      enqueueSnackbar(
        'data' in response ? response.message : 'An unexpected error happened',
        'error',
      );
      setIsLoading(false);
    }
  };

  // Function to send the sms and redirect the user to the wallet
  const sendSmsAndRedirect = async (
    phone: string,
    otp: string,
    url: string,
  ): Promise<void> => {
    const response = await requestSendSms({ phone, otp: otp as string });
    if (response.error) {
      enqueueSnackbar(response.error, 'error');
      setIsLoading(false);
    } else {
      setStep(Steps.REDIRECT);
      showClipboardSnackbar(otp, enqueueSnackbar, closeSnackbar);
      setTimeout(() => router.push(url), 8000);
    }
  };

  // Redirect to the success page if the identityUuid is valid
  // Otherwise, show an error message and prompt the user to type the phone number
  const handleGetIdentityUuid = async (identityUuid: string) => {
    setIsLoading(true);
    const response = await getOneClick(identityUuid as string);
    console.log(response);
    if ('credentials' in response) {
      setStep(Steps.SUCCESS);
    } else {
      enqueueSnackbar(
        "We couldn't find your identity. Please try again.",
        'error',
      );
      setStep(Steps.PHONE);
    }

    setIsLoading(false);
  };

  const reset = () => {
    router.push('/register/1-click/hosted');
  };

  // Check if the identityUuid query parameter is present and call the getOneClick endpoint
  // If the identityUuid is not present, just prompt the user to type the phone number
  useEffect(() => {
    // Check if the router is ready
    // Necessary to wait for the router to be ready to get the query parameters
    // While this is not ready, the page will be shown as loading
    if (!router.isReady) return;

    // Check if the identityUuid query parameter is present

    if (router.query.identityUuid) {
      handleGetIdentityUuid(router.query.identityUuid as string);
    } else {
      setStep(Steps.PHONE);
    }
  }, [router.query.identityUuid]); // Re-run the effect if the query parameter changes

  return (
    <>
      <Head page='Signup' />
      <PageHeader
        title='1-Click Signup'
        subtitle='(Hosted)'
        description='This is Slooow, but not slooow!'
      />
      <Container maxWidth='xs'>
        <When value={step === Steps.LOADING}>
          <LoadingSpinner />
        </When>
        <When value={step !== Steps.LOADING}>
          <When value={step === Steps.PHONE}>
            <PhoneStep onValidPhone={handleValidPhone} disabled={isLoading} />
            <LegalLanguage />
            <TestPhoneNumbersBanner />
          </When>
          <When value={step === Steps.SUCCESS}>
            <SuccessfulSignUpStep onSignOut={reset} />
          </When>
        </When>
        <When value={step === Steps.REDIRECT}>
          <RedirectStep />
        </When>
      </Container>
    </>
  );
}

OneClickHosted.auth = {};

OneClickHosted.getLayout = MainLayout;

export default OneClickHosted;
