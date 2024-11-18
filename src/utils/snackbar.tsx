import { ContentCopy } from '@mui/icons-material';
import { SnackbarKey } from '@verifiedinc-public/shared-ui-elements';

export const showClipboardSnackbar = (
  otp: string,
  updateSnackbar: any,
  closeSnackbar: any,
) => {
  updateSnackbar(`Verification Code: ${otp}`, 'info', {
    alertAction: {
      onAction: (id: SnackbarKey) => {
        navigator.clipboard.writeText(otp);
        updateSnackbar('Verification Code copied to clipboard');
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
