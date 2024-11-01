import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack, TextField } from '@mui/material';
import {
  Button,
  DateInput,
  SSNInput,
} from '@verifiedinc/shared-ui-elements/components';
import { ReactNode } from 'react';

import { Controller, useForm } from 'react-hook-form';
import {
  signupFormSchema,
  type SimpleSignupForm,
} from './simple-signup.schema';

interface SimpleSignupFormStepProps {
  onSubmit: (data: SimpleSignupForm) => void;
}

export default function SimpleSignupFormStep({
  onSubmit,
}: SimpleSignupFormStepProps): ReactNode {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SimpleSignupForm>({
    resolver: zodResolver(signupFormSchema),
  });

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
        <TextField label='Middle Name' {...getCommonFormProps('middleName')} />
        <TextField label='Last Name' {...getCommonFormProps('lastName')} />
        <Controller
          control={control}
          name='dob'
          render={({ field: { onChange, onBlur, value } }) => (
            <DateInput
              onChange={onChange} // send value to hook form
              onBlur={onBlur} // notify when input is touched/blur
              value={value}
              allowFutureDates={false}
              error={!!errors.dob}
              helperText={errors.dob?.message?.toString()}
            />
          )}
        />

        <Controller
          control={control}
          name='ssn'
          render={({ field: { onChange, value } }) => (
            <SSNInput
              onChange={onChange} // send value to hook form
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
        <TextField
          label='Address Line 2'
          {...getCommonFormProps('addressLine2')}
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
