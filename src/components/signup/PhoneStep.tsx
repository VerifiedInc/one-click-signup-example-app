import { Box } from '@mui/material';
import { PhoneInput } from '@verifiedinc-public/shared-ui-elements';
import { ReactNode } from 'react';
import Title from '../UI/Title';

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
      <Title>Enter your phone number:</Title>
      <PhoneInput onValidPhone={onValidPhone} InputProps={{ disabled }} />
    </Box>
  );
}
