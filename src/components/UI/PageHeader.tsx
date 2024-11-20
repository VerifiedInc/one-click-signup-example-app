import { Box, Stack, Typography } from '@mui/material';
import { When, Image } from '@verifiedinc-public/shared-ui-elements';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  description?: string;
};

export function PageHeader({
  title,
  subtitle,
  description,
}: Readonly<PageHeaderProps>) {
  return (
    <Stack sx={{ my: 6 }} alignItems='center' spacing={3} pb={1}>
      <Image src={'/slooow.png'} alt={'logo'} width='110px' component='img' />
      <Box>
        <Typography variant='h3' fontSize={48} fontWeight='800'>
          {title}
        </Typography>
        <When value={!!subtitle}>
          <Typography variant='h3' fontSize={30} fontWeight='800'>
            {subtitle}
          </Typography>
        </When>
      </Box>
      <When value={!!description}>
        <Typography
          variant='h4'
          fontSize={25}
          color='text.disabled'
          textAlign='center'
        >
          {description}
        </Typography>
      </When>
    </Stack>
  );
}
