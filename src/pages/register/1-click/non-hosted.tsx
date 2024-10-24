import { Head } from '@/components/layouts/head';
import { MainLayout } from '@/components/layouts/main-layout';
import { PageHeader } from '@/components/UI/PageHeader';
import { Box } from '@mui/material';

function RegisterNonHosted() {
  return (
    <>
      <Head page='Register Non Hosted' />
      <PageHeader
        title='Register Non Hosted'
        description='Register with 1-click Non Hosted'
      />
      <Box></Box>
    </>
  );
}

RegisterNonHosted.auth = {};

RegisterNonHosted.getLayout = MainLayout;

export default RegisterNonHosted;
