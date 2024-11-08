import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';
import { MenuItem as MuiMenuItem, ListItemText } from '@mui/material';
import React from 'react';

interface MenuItemProps {
  label: string;
  path: string;
  onClick: () => void;
}

function MenuItem({ label, path, onClick }: MenuItemProps): ReactNode {
  const theme = useTheme();
  const router = useRouter();

  // Memoize the styling to avoid recalculation on each render
  const menuItemStyling = useMemo(() => {
    if (router.pathname === path) {
      return { color: theme.palette.primary.main };
    }
    return {};
  }, [path, router.pathname, theme.palette.primary.main]);

  // Prevent unnecessary re-renders when props don't change
  return (
    <MuiMenuItem
      onClick={onClick}
      data-testid={`main-layout-menu-item-${label}`}
    >
      <ListItemText sx={menuItemStyling}>{label}</ListItemText>
    </MuiMenuItem>
  );
}

export default React.memo(MenuItem);
