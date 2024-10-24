import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';
import { PageHeader } from '@/components/UI/PageHeader';
import { Box } from '@mui/material';

function Register() {
  return (
    <>
      <Head page='Register' />
      <PageHeader title='Register' description='Register without 1-click' />
      <Box>
        <p>Register page</p>
      </Box>
    </>
  );
}

Register.auth = {};

Register.getLayout = MainLayout;

export default Register;
