import { Link, Typography } from '@mui/material';

export default function LegalLanguage() {
  return (
    <Typography variant='body2' color='textSecondary'>
      By entering your phone number, you agree to create a Verified account for
      1-Click Signup at Slooow and other supported sites, and you agree to
      Verified's{' '}
      <Link color='primary' href='https://verified.inc/legal#terms-of-use'>
        Terms of Use.
      </Link>
    </Typography>
  );
}
