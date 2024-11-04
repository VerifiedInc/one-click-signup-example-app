import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import {
  DateInput,
  Image,
  Typography,
} from '@verifiedinc/shared-ui-elements/components';
import { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
    reset,
    formState: { errors },
  } = useForm<DobForm>({
    resolver: zodResolver(dobFormSchema),
  });

  const onSubmit = (data: DobForm) => {
    // Format the unix timestamp date to YYYY-MM-DD
    const formatedDate = new Date(Number(data.dob)).toISOString().split('T')[0];

    onValidDob(formatedDate);
    reset();
  };

  return (
    <Box>
      <Image
        src={'/slooow.png'}
        alt={'logo'}
        maxWidth='200px'
        component='img'
        sx={{ pb: 3 }}
      />
      <Typography variant='h6' gutterBottom>
        Enter your Date of Birth
      </Typography>
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <Controller
            control={control}
            name='dob'
            disabled={disabled}
            render={({ field }) => (
              <DateInput
                {...field}
                allowFutureDates={false}
                error={!!errors.dob}
                helperText={errors.dob?.message?.toString()}
              />
            )}
          />
          <Button
            type='submit'
            variant='contained'
            size='large'
            disabled={disabled}
          >
            Enter
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
