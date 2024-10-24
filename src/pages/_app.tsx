import { Head } from '@/components/layouts/head';
import '@/styles/globals.css';
import { Box, ThemeProvider } from '@mui/material';
import { lato, theme } from '@/styles/theme';

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { ClientOnly } from '@/components/layouts/clientOnly';
import { EnvProvider } from '@/contexts/EnvContext';

function AppBody({ Component, pageProps }: AppProps & { Component: any }) {
  const getLayout = Component.getLayout || ((page: any) => page);

  return <>{getLayout(<Component {...pageProps} />)}</>;
}

export default function App(props: AppProps & { Component: any }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={props.pageProps.dehydratedState}>
        <Head />
        <ThemeProvider theme={theme}>
          <Box
            className={`${lato.className}`}
            sx={{ display: 'flex', flex: 1, width: '100%', minHeight: '100vh' }}
          >
            <ClientOnly>
              <EnvProvider>
                <AppBody {...props} />
              </EnvProvider>
            </ClientOnly>
          </Box>
        </ThemeProvider>
      </HydrationBoundary>
      <ReactQueryDevtools buttonPosition='bottom-right' />
    </QueryClientProvider>
  );
}
