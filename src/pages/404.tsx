import { MainLayout } from '@/components/layouts/main-layout';

import { Head } from '@/components/layouts/head';
import { NotFoundCard } from '@/components/UI/NotFoundCard';

function NotFoundPage() {
  return (
    <>
      <Head page='Not Found' />
      <NotFoundCard />
    </>
  );
}

NotFoundPage.getLayout = MainLayout;

export default NotFoundPage;
