import { ReactNode } from 'react';
import { Box, Stack, Typography } from '@mui/material';

type PageHeaderProps = {
  title: string | ReactNode;
  description?: string | ReactNode;
  titleRightChildren?: ReactNode;
};

export function PageHeader(props: Readonly<PageHeaderProps>) {
  return (
    <Box sx={{ mt: 6.25 }}>
      <Stack direction='row' alignItems='center' spacing={1}>
        <Typography variant='h3' fontSize={50} fontWeight='800'>
          {props.title}
        </Typography>
        {props.titleRightChildren}
      </Stack>
      {!!props.description && (
        <Typography
          variant='h4'
          fontSize={30}
          fontWeight='700'
          color='text.disabled'
        >
          {props.description}
        </Typography>
      )}
    </Box>
  );
}
