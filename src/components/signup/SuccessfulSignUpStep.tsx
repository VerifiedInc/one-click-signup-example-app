import { Button, Stack, Typography, useTheme } from '@mui/material';
import { VerifiedImage } from '@verifiedinc-public/shared-ui-elements';
import Title from '../UI/Title';

interface SuccessfulSignUpStepProps {
  onSignOut: () => void;
}
// This component is used to show the user that the sign up was successful
export default function SuccessfulSignUpStep({
  onSignOut,
}: SuccessfulSignUpStepProps) {
  const theme = useTheme();
  return (
    <Stack spacing={3} sx={{ alignItems: 'center', mt: -4 }}>
      <Title sx={{ textAlign: 'center', pb: 2 }}>
        You've signed up for Slooow!
      </Title>
      <VerifiedImage
        theme={{
          light: theme.palette.primary.main,
          main: theme.palette.primary.main,
          dark: theme.palette.primary.main,
        }}
      />
      <Button
        size='large'
        variant='contained'
        color='primary'
        onClick={onSignOut}
      >
        Sign Out
      </Button>
    </Stack>
  );
}
