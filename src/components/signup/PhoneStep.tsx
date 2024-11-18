import { Box } from '@mui/material';
import { PhoneInput, Typography } from '@verifiedinc-public/shared-ui-elements';
import { ReactNode } from 'react';

interface PhoneStepProps {
  onValidPhone: (phone: string) => void;
  disabled?: boolean;
}

export default function PhoneStep({
  onValidPhone,
  disabled,
}: PhoneStepProps): ReactNode {
  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Enter your phone number:
      </Typography>
      <PhoneInput onValidPhone={onValidPhone} InputProps={{ disabled }} />
    </Box>
  );
}
