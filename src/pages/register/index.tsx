import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';
import { PageHeader } from '@/components/UI/PageHeader';
import OtpValidate from '@/features/otp/components/ValidateOtp';
import { Box, Stack } from '@mui/material';

function Register() {
  return (
    <>
      <Head page='Register' />
      <PageHeader title='Register' description='Register without 1-click' />
      <Stack maxWidth={500}>
        <OtpValidate
          otpCode='1234'
          onValidate={() => {
            console.log('valid');
          }}
        />
      </Stack>
    </>
  );
}

Register.auth = {};

Register.getLayout = MainLayout;

export default Register;
