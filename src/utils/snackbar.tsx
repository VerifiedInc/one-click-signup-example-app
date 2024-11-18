import { ContentCopy } from '@mui/icons-material';
import { SnackbarKey } from '@verifiedinc-public/shared-ui-elements';

export const showClipboardSnackbar = (
  otp: string,
  enqueueSnackbar: any,
  closeSnackbar: any,
) => {
  enqueueSnackbar(`Verification Code: ${otp}`, 'info', {
    alertAction: {
      onAction: (id: SnackbarKey) => {
        navigator.clipboard.writeText(otp);
        enqueueSnackbar('Verification Code copied to clipboard');
        closeSnackbar(id);
      },
      icon: (
        <>
          <ContentCopy />
        </>
      ),
    },
  });
};
