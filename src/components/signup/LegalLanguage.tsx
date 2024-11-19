import { Link, Stack, Typography } from '@mui/material';
import { Image } from '@verifiedinc-public/shared-ui-elements';

interface LegalLanguageProps {
  actionMessage?: string;
}

export default function LegalLanguage({
  actionMessage = 'entering your phone number, you agree to receive an SMS to create a Verified account for 1-Click Signup at Slooow and other supported sites, and',
}: LegalLanguageProps) {
  return (
    <Stack alignItems='center'>
      <Image
        src='/verified-gray.svg'
        width={310}
        alt='Powered By Verified Graphic'
        sx={{ py: 2 }}
      />
      <Typography variant='body2' color='textSecondary'>
        By {actionMessage} you agree to Verified's{' '}
        <Link color='primary' href='https://verified.inc/legal#terms-of-use'>
          Terms of Use.
        </Link>
      </Typography>
    </Stack>
  );
}
