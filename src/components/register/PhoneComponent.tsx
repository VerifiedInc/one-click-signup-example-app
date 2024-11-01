import { Box } from '@mui/material';
import {
  PhoneInput,
  Typography,
} from '@verifiedinc/shared-ui-elements/components';
import { ReactNode } from 'react';

interface PhoneComponentProps {
  onValidPhone: (phone: string) => void;
  disabled?: boolean;
  children?: ReactNode;
}

function PhoneComponent({
  onValidPhone,
  disabled,
  children,
}: PhoneComponentProps): ReactNode {
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

export default PhoneComponent;
