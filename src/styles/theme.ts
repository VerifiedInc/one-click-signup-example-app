import { Lato } from 'next/font/google';
import { theme as sharedTheme } from '@verifiedinc-public/shared-ui-elements';

declare module '@mui/material/styles' {
  // custom palette
  interface Palette {
    neutral: Palette['primary'];
    neutralContrast: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    neutralContrast: PaletteOptions['primary'];
  }
}

// add neutral color palette as color option for buttons
declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    neutralContrast: true;
  }
  interface SvgIconPropsColorOverrides {
    neutral: true;
    neutralContrast: true;
  }
}

// Google font configuration for Next.js
export const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  display: 'swap',
});

export const theme = sharedTheme({
  primaryFontFace: lato,
});

theme.palette.primary = {
  main: '#D32D2D',
  light: '#FF6B6B',
  dark: '#9A0007',
  contrastText: '#FFFFFF',
};
