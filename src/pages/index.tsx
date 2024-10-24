import { useRouter } from 'next/router';

import { MainLayout } from '@/components/layouts/main-layout';

function StarterApp() {
  const router = useRouter();

  router.push('/register');

  return null;
}

StarterApp.getLayout = MainLayout;

export default StarterApp;
