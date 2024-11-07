import {
  Container,
  IconButton,
  Menu,
  Stack,
  Toolbar,
  useTheme,
} from '@mui/material';
import { Typography } from '@verifiedinc-public/shared-ui-elements/components';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

import { IconPlayer } from '@/components/UI/IconPlayer';
import MenuItem from './MenuItem';
import { styles } from './mainLayout.styles';
import { useRouter } from 'next/router';

function Menubar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const router = useRouter();
  return (
    <Toolbar sx={styles.toolbar}>
      <Stack
        direction='row'
        spacing={1}
        onClick={() => router.reload()}
        sx={{
          alignItems: 'center',
          cursor: 'pointer',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      >
        <Image src='/slooow.png' width={42} height={42} alt='Slooow logo' />
        <Typography
          color='text.disabled'
          fontWeight={300}
          sx={{ fontSize: 36, lineHeight: 'normal' }}
        >
          Slooow
        </Typography>
      </Stack>
      <Stack direction='row' spacing={2}>
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
          <MenuItem label='Without 1-click' path='/register' />
          <MenuItem
            label='1-click Non-Hosted'
            path='/register/1-click/non-hosted'
          />
          <MenuItem
            label='1-click Semi-Hosted'
            path='/register/1-click/semi-hosted'
          />
          <MenuItem label='1-click Hosted' path='/register/1-click/hosted' />
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
