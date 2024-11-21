import { Box } from '@mui/material';
import { Backdrop, PhoneInput } from '@verifiedinc-public/shared-ui-elements';
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
    <>
      <Backdrop open={!!disabled} />
      <Box>
        <Title>Enter your phone number:</Title>
        <PhoneInput onValidPhone={onValidPhone} InputProps={{ disabled }} />
      </Box>
    </>
  );
}
