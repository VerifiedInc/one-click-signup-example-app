import { Stack, Typography } from '@mui/material';
import { NotFoundAnimation } from '@/components/UI/animations/NotFoundAnimation';
import { AnimatedButton } from '@/components/UI/AnimatedButton';
import Link from 'next/link';

export function NotFoundCard() {
  const link = '/';
  const linkText = 'Back to Home';
  const linkIcon = 'home';
  return (
    <Stack flex={1} alignItems='center' justifyContent='center'>
      <Stack alignItems='center' sx={{ maxWidth: 600, mx: 'auto' }}>
        <NotFoundAnimation />
        <Typography fontSize={36} fontWeight={900}>
          Not Found
        </Typography>
        <Typography
          fontSize={20}
          fontWeight={300}
          sx={{ mt: 1, textAlign: 'center' }}
        >
          The page or resource you are looking for does not exist.
          <br />
          But don't worry, you can continue navigating.
        </Typography>

        <Link href={link}>
          <AnimatedButton
            variant='contained'
            color='primary'
            text={linkText}
            animationIcon={linkIcon}
            sx={{ mt: 3 }}
          />
        </Link>
      </Stack>
    </Stack>
  );
}
