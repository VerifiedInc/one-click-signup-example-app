import { Box } from '@mui/material';
import { Typography } from '@verifiedinc-public/shared-ui-elements';
import { ReactNode } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

export default function RedirectStep(): ReactNode {
  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        You'll be redirected to the wallet
      </Typography>
      <LoadingSpinner />
    </Box>
  );
}
