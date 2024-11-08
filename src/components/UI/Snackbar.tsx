import { Close, ContentCopy } from '@mui/icons-material';
import {
  Alert,
  IconButton,
  Snackbar as MUISnackbar,
  Portal,
} from '@mui/material';
import {
  useDisclosure,
  UseDisclosureProps,
} from '@verifiedinc-public/shared-ui-elements';
import { useState } from 'react';

interface SnackbarOptions {
  message: string;
  severity?: 'error' | 'success' | 'info' | 'warning';
  position?: 'left' | 'right';
  onCopyClick?: () => void;
}

interface SnackbarProps {
  disclosure: UseDisclosureProps;
  snackbarOptions: SnackbarOptions;
}

export function useSnackbar() {
  const disclosure = useDisclosure();
  const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>({
    message: '',
  });

  const updateSnackbar = (options: SnackbarOptions) => {
    setSnackbarOptions({ ...options });
    disclosure.onOpen();
  };

  return { disclosure, snackbarOptions, updateSnackbar };
}

function CopyButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton size='small' onClick={onClick} sx={{ ml: 2 }} color='inherit'>
      <ContentCopy />
    </IconButton>
  );
}

export default function Snackbar({
  disclosure,
  snackbarOptions,
}: SnackbarProps) {
  return (
    <Portal>
      <MUISnackbar
        open={disclosure.open}
        onClose={disclosure.onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: snackbarOptions.position ?? 'left',
        }}
      >
        <Alert
          severity={snackbarOptions.severity ?? 'success'}
          action={
            snackbarOptions.onCopyClick && (
              <CopyButton onClick={snackbarOptions.onCopyClick} />
            )
          }
          sx={{ alignItems: 'center' }}
        >
          {snackbarOptions.message}
        </Alert>
      </MUISnackbar>
    </Portal>
  );
}
