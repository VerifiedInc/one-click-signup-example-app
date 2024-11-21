/**
 * Custom hook to manage the steps of the application
 *
 * To know more about custom hooks, check the link below:
 * @see https://medium.com/@vitorbritto/react-design-patterns-custom-hooks-pattern-f8e1c019c846
 */

import { useSnackbar } from '@verifiedinc-public/shared-ui-elements';
import { useEffect, useState } from 'react';

export const useSteps = () => {
  enum Steps {
    PHONE,
    OTP,
    DOB,
    FORM,
    SUCCESS,
  }
  // First step is the phone number form
  const [step, setStep] = useState(Steps.PHONE);

  const { closeSnackbar } = useSnackbar();
  // Close the snackbar when goes to some steps
  useEffect(() => {
    if (step === Steps.FORM || step === Steps.SUCCESS || step === Steps.DOB) {
      closeSnackbar();
    }
  }, [step]);

  return { step, setStep, Steps };
};
