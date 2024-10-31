import { Head } from '@/components/layouts/head';
import '@/styles/globals.css';
import { lato, theme } from '@/styles/theme';
import { Box, ThemeProvider } from '@mui/material';

import { ClientOnly } from '@/components/layouts/clientOnly';

import type { AppProps } from 'next/app';

function AppBody({ Component, pageProps }: AppProps & { Component: any }) {
  const getLayout = Component.getLayout || ((page: any) => page);

  return <>{getLayout(<Component {...pageProps} />)}</>;
}

export default function App(props: AppProps & { Component: any }) {
  return (
    <>
      <Head />
      <ThemeProvider theme={theme}>
        <Box
          className={`${lato.className}`}
          sx={{ display: 'flex', flex: 1, width: '100%', minHeight: '100vh' }}
        >
          <ClientOnly>
            <AppBody {...props} />
          </ClientOnly>
        </Box>
      </ThemeProvider>
    </>
  );
}
