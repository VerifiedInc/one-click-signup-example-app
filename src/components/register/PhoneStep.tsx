import { Box } from '@mui/material';
import {
  PhoneInput,
  Typography,
} from '@verifiedinc/shared-ui-elements/components';
import { ReactNode } from 'react';

interface PhoneStepProps {
  onValidPhone: (phone: string) => void;
  disabled?: boolean;
  children?: ReactNode;
}

export default function PhoneStep({
  onValidPhone,
  disabled,
  children,
}: PhoneStepProps): ReactNode {
  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Enter your phone number
      </Typography>
      <PhoneInput onValidPhone={onValidPhone} InputProps={{ disabled }} />
      {children}
    </Box>
  );
}
