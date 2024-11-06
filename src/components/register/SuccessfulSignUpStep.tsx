import { Button, Stack, Typography, useTheme } from '@mui/material';
import { VerifiedImage } from '@verifiedinc/shared-ui-elements/components';

interface SuccessfulSignUpStepProps {
  onSignOut: () => void;
}
// This component is used to show the user that the sign up was successful
export default function SuccessfulSignUpStep({
  onSignOut,
}: SuccessfulSignUpStepProps) {
  const theme = useTheme();
  return (
    <Stack spacing={3} sx={{ alignItems: 'center' }}>
      <Typography
        variant='h3'
        align='center'
        sx={{ fontSize: 22, fontWeight: 400, mt: 2 }}
      >
        You have successfully signed up to Slooow.
      </Typography>
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
