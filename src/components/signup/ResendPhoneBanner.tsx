import { SxProps, useTheme } from '@mui/material';
import {
  Button,
  FullWidthAlert,
  parseToPhoneNational,
} from '@verifiedinc-public/shared-ui-elements';

interface ResendPhoneBannerProps {
  phone: string;
  onClick: () => void;
  disabled?: boolean;
  sx?: SxProps;
}

/**
 * Banner to verify and resend the phone verification code.
 * @param phone
 * @param onClick
 * @constructor
 */
export function ResendPhoneBanner({
  phone,
  onClick,
  disabled = false,
  sx,
}: ResendPhoneBannerProps) {
  const theme = useTheme();
  return (
    <>
      <FullWidthAlert
        action={
          <Button
            onClick={onClick}
            sx={{
              color: theme.palette.info.contrastText,
              fontWeight: 800,
              fontSize: '13px',
              padding: '0',
              '&:hover': {
                backgroundColor: 'initial',
              },
            }}
            size='small'
            variant='text'
            color='info'
          >
            Resend
          </Button>
        }
      >
        Use the text we sent to <strong>{parseToPhoneNational(phone)}</strong>{' '}
      </FullWidthAlert>
    </>
  );
}
