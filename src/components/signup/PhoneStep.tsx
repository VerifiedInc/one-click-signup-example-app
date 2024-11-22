import { Box } from '@mui/material';
import {
  PhoneInput,
  useSnackbar,
} from '@verifiedinc-public/shared-ui-elements';
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
  const { closeSnackbar } = useSnackbar();

  const handleValidPhone = (phone: string) => {
    closeSnackbar();
    onValidPhone(phone);
  };

  return (
    <Box>
      <Title>Enter your phone number:</Title>
      <PhoneInput onValidPhone={handleValidPhone} InputProps={{ disabled }} />
    </Box>
  );
}
