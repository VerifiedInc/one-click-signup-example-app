import { Box } from '@mui/material';
import { ReactNode } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';
import Title from '../UI/Title';

export default function RedirectStep(): ReactNode {
  return (
    <Box my={3}>
      <Title>You'll be redirected to the wallet</Title>
      <LoadingSpinner />
    </Box>
  );
}
