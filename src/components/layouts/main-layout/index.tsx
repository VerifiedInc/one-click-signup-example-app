import {
  Container,
  IconButton,
  Menu,
  Stack,
  Toolbar,
  useTheme,
} from '@mui/material';
import { Typography } from '@verifiedinc/shared-ui-elements/components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

import { AnimatedButton } from '@/components/UI/AnimatedButton';

import { IconPlayer } from '@/components/UI/IconPlayer';
import { useEnv } from '@/contexts/EnvContext';
import MenuItem from './MenuItem';
import { styles } from './mainLayout.styles';

function Menubar() {
  const env = useEnv();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const router = useRouter();
  return (
    <Toolbar
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(8px)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        borderBottomStyle: 'solid',
        zIndex: 2,
      }}
    >
      <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
        <Image
          src='/horizontal-logo-alt.svg'
          width={172}
          height={42}
          alt='Verified logo'
        />
        <Typography
          color='text.disabled'
          fontWeight={300}
          sx={{ fontSize: 36, lineHeight: 'normal' }}
        >
          1-Click Starter App
        </Typography>
      </Stack>
      <Stack direction='row' spacing={2}>
        <AnimatedButton
          text='DEMO'
          data-testid='main-layout-redirect-demo-button'
          href={env.demoUrl}
          animationIcon='play'
        />
        <AnimatedButton
          text='DOCS'
          data-testid='main-layout-redirect-docs-button'
          href={env.docsUrl}
          animationIcon='code'
        />
        <AnimatedButton
          text='DASHBOARD'
          data-testid='main-layout-redirect-docs-button'
          href={env.dashboardUrl}
          animationIcon='store'
        />
        <IconButton
          id='positioned-button'
          data-testid='main-layout-menu-button'
          aria-controls={open ? 'positioned-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={(event) => setAnchorEl(event.currentTarget)}
          sx={{ borderRadius: '50%' }}
        >
          <IconPlayer
            animation={'settings'}
            speed={0.5}
            color={theme.palette.primary.main}
            paintFill
            paintStroke
          />
        </IconButton>
        <Menu
          id='positioned-menu'
          aria-labelledby='positioned-button'
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          disableScrollLock
        >
          <MenuItem label='No Integration' path='/register' />
          <MenuItem label='Non-Hosted' path='/register/1-click/non-hosted' />
          <MenuItem label='Semi-Hosted' path='/register/1-click/semi-hosted' />
          <MenuItem label='Hosted' path='/register/1-click/hosted' />
        </Menu>
      </Stack>
    </Toolbar>
  );
}

function MainLayoutBody({ page }: { page: ReactNode }) {
  return (
    <Stack direction='column' flex={1}>
      <Menubar />
      <Container sx={styles.container}>{page}</Container>
    </Stack>
  );
}

export function MainLayout(page: ReactNode) {
  return <MainLayoutBody page={page} />;
}
