import { Link, Typography, Stack } from '@mui/material';
import { Image } from '@verifiedinc-public/shared-ui-elements';

export default function LegalLanguage() {
  return (
    <Stack alignItems='center'>
      <Image
        src='/verified-gray.svg'
        width={310}
        alt='Powered By Verified Graphic'
        sx={{ py: 2 }}
      />
      <Typography variant='body2' color='textSecondary'>
        By entering your phone number, you agree to receive an SMS to create a
        Verified account for 1-Click Signup at Slooow and other supported sites,
        and you agree to Verified's{' '}
        <Link color='primary' href='https://verified.inc/legal#terms-of-use'>
          Terms of Use.
        </Link>
      </Typography>
    </Stack>
  );
}
