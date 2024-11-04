import { Box } from '@mui/material';
import {
  PhoneInput,
  Typography,
  Image,
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
      <Image
        src={'/slooow.png'}
        alt={'logo'}
        maxWidth='200px'
        component='img'
        sx={{ pb: 3 }}
      />
      <Typography variant='h6' gutterBottom>
        Enter your phone number
      </Typography>
      <PhoneInput onValidPhone={onValidPhone} InputProps={{ disabled }} />
      {children}
    </Box>
  );
}
