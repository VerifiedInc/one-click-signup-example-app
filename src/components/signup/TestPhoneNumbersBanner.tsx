import { AlertTitle, Box, useTheme } from '@mui/material';
import {
  FullWidthAlert,
  Typography,
} from '@verifiedinc-public/shared-ui-elements';

/**
 * Banner to inform about the test phone numbers
 */
export function TestPhoneNumbersBanner() {
  const theme = useTheme();
  return (
    <Box sx={{ mt: 3 }}>
      <FullWidthAlert severity='info' sx={{ alignItems: 'start' }}>
        <AlertTitle>
          <Typography
            sx={{ color: theme.palette.info.contrastText }}
            fontWeight='bold'
          >
            Use our test user phone numbers
          </Typography>
        </AlertTitle>
        <Box
          component='ul'
          sx={{
            listStyle: 'inside',
          }}
        >
          <li>Phone Only Input: +10123456789</li>
          <li>Phone and Birth Date Inputs: +10019999999</li>
        </Box>
      </FullWidthAlert>
    </Box>
  );
}
