import { Box } from '@mui/material';
import {
  PhoneInput,
  Typography,
} from '@verifiedinc/shared-ui-elements/components';
import { ReactNode } from 'react';

interface DobStepProps {
  onValidPhone: (phone: string) => void;
  disabled?: boolean;
  children?: ReactNode;
}

function DobStep({
  onValidPhone,
  disabled,
  children,
}: DobStepProps): ReactNode {
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

export default DobStep;
