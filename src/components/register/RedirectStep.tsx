import { Box } from '@mui/material';
import {
  PhoneInput,
  Typography,
  Image,
} from '@verifiedinc-public/shared-ui-elements';
import { ReactNode } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

export default function RedirectStep(): ReactNode {
  return (
    <Box>
      <Image
        src={'/slooow.png'}
        alt={'logo'}
        width='200px'
        height='224px'
        component='img'
        sx={{ pb: 3 }}
      />
      <Typography variant='h6' gutterBottom>
        You'll be redirected to the wallet
      </Typography>
      <LoadingSpinner />
    </Box>
  );
}
