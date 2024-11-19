import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack } from '@mui/material';
import {
  DateInput,
  ExactBirthdayBanner,
  formatDateToTimestamp,
} from '@verifiedinc-public/shared-ui-elements';
import { ReactNode, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import LegalLanguage from '../LegalLanguage';
import { DobForm, dobFormSchema } from './dob.schema';

interface DobFormStepProps {
  onValidDob: (dob: string) => void;
  disabled?: boolean;
}

export default function DobFormStep({
  onValidDob,
  disabled,
}: DobFormStepProps): ReactNode {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<DobForm>({
    resolver: zodResolver(dobFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const shouldBeDisabled = disabled || isLoading;

  const onSubmit = (data: DobForm) => {
    setIsLoading(true);
    // Format date to YYYY-MM-DD
    const formatedDate = new Date(data.dob).toISOString().split('T')[0];

    onValidDob(formatedDate);
    setIsLoading(false);
  };

  function checkShouldSubmit(value: string) {
    if (value?.length === 10) {
      handleSubmit(onSubmit)();
    }
  }

  return (
    <Stack spacing={3}>
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='dob'
          disabled={disabled}
          render={({ field }) => (
            <DateInput
              {...field}
              error={!!errors.dob}
              disabled={shouldBeDisabled}
              onChange={(value) => {
                field.onChange(value);
                checkShouldSubmit(value);
              }}
              helperText={errors.dob?.message?.toString()}
            />
          )}
        />

        <LegalLanguage actionMessage='continuing' />
      </Box>
      <ExactBirthdayBanner />
    </Stack>
  );
}
