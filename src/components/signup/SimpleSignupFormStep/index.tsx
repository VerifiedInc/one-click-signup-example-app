import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack, TextField } from '@mui/material';
import { Button, SSNInput } from '@verifiedinc-public/shared-ui-elements';
import { ReactNode } from 'react';

import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import {
  signupFormSchema,
  type SimpleSignupForm,
} from './simple-signup.schema';

interface SimpleSignupFormStepProps {
  onSubmit: (data: SimpleSignupForm) => void;
}

// This component is a form with all the fields needed to sign up
// It uses the SimpleSignupForm schema to validate the form
// It doesn't have any 1-Click implementation to it
export default function SimpleSignupFormStep({
  onSubmit,
}: SimpleSignupFormStepProps): ReactNode {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<SimpleSignupForm>({
    resolver: zodResolver(signupFormSchema),
  });

  // This function is used to get the common props for the form fields
  const getCommonFormProps = (fieldName: keyof SimpleSignupForm) => {
    return {
      ...register(fieldName),
      error: !!errors[fieldName],
      helperText: errors[fieldName]?.message?.toString(),
      size: 'small' as 'small',
    };
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <TextField label='First Name' {...getCommonFormProps('firstName')} />
        <TextField label='Last Name' {...getCommonFormProps('lastName')} />
        <DatePicker
          label='Select Date of Birth'
          slotProps={{
            textField: {
              error: !!errors.dob,
              helperText: errors.dob?.message?.toString(),
              size: 'small',
            },
          }}
          onChange={(date) => {
            if (date) setValue('dob', date.toDate());
          }}
        />

        <Controller
          control={control}
          name='ssn'
          render={({ field: { onChange, value } }) => (
            <SSNInput
              onChange={onChange}
              value={value}
              error={!!errors.ssn}
              helperText={errors.ssn?.message?.toString()}
            />
          )}
        />

        <TextField
          label='Address Line 1'
          {...getCommonFormProps('addressLine1')}
        />

        <TextField label='City' {...getCommonFormProps('city')} />
        <TextField label='State' {...getCommonFormProps('state')} />
        <TextField label='ZIP Code' {...getCommonFormProps('zip')} />
        <TextField label='Country' {...getCommonFormProps('country')} />
        <Button type='submit' variant='contained' size='large'>
          Sign up
        </Button>
      </Stack>
    </Box>
  );
}
