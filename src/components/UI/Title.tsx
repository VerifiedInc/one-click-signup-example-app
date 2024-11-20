import { type SxProps, Typography } from '@mui/material';

interface TitleProps {
  children: React.ReactNode;
  sx?: SxProps;
}

export default function Title({ children, sx }: TitleProps) {
  return (
    <Typography sx={{ fontSize: 18, fontWeight: 'bold', ...sx }}>
      {children}
    </Typography>
  );
}
