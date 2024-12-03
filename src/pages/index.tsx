import { useRouter } from 'next/router';

import { MainLayout } from '@/components/layouts/main-layout';

function OneClickSignupExampleApp() {
  const router = useRouter();

  router.push('/signup/manual');

  return null;
}

OneClickSignupExampleApp.getLayout = MainLayout;

export default OneClickSignupExampleApp;
