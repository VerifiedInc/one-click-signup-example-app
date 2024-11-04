import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack, TextField } from '@mui/material';
import {
  Button,
  SelectInput,
  SSNInput,
  When,
} from '@verifiedinc/shared-ui-elements/components';
import { ReactNode, useMemo, useState } from 'react';

import { OneClickCredentials } from '@/types/OneClick.types';
import { Controller, useForm } from 'react-hook-form';
import {
  SignupOneClickForm,
  signupOneClickFormSchema,
} from './signup-one-click.schema';

interface SignupOneClickFormStepProps {
  onSubmit: (data: SignupOneClickForm) => void;
  credentials: OneClickCredentials | null;
}

export default function SignupOneClickFormStep({
  credentials,
  onSubmit,
}: SignupOneClickFormStepProps): ReactNode {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupOneClickForm>({
    resolver: zodResolver(signupOneClickFormSchema),
  });

  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  const buildAddressOptions = useMemo(() => {
    const options = [
      {
        id: '0',
        label: '+ Add New Address',
      },
    ];

    if (credentials?.address) {
      options.push(
        ...(credentials.address?.map((address, index) => ({
          id: `${index + 1}`,
          label: `${address.line1}, ${address.city}, ${address.state}, ${address.zipCode}`,
        })) ?? []),
      );
    }

    return options;
  }, [credentials?.address]);

  const handleSelectAddressOption = (
    option: { label: string; id: string } | null,
  ) => {
    if (!option) {
      setSelectedAddressIndex(null);
      return;
    }
    setIsAddingNewAddress(option.id === '0');
    setSelectedAddressIndex(+option.id);
    if (option.id !== '0') {
      const credentialIndex = +option.id - 1;
      reset({
        addressLine1: credentials?.address?.[credentialIndex]?.line1,
        city: credentials?.address?.[credentialIndex]?.city,
        state: credentials?.address?.[credentialIndex]?.state,
        zip: credentials?.address?.[credentialIndex]?.zipCode,
        country: credentials?.address?.[credentialIndex]?.country,
      });
    } else {
      reset({
        addressLine1: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      });
    }
  };

  const getCommonFormProps = (fieldName: keyof SignupOneClickForm) => {
    return {
      ...register(fieldName),
      error: !!errors[fieldName],
      helperText: errors[fieldName]?.message?.toString(),
      size: 'small' as 'small',
    };
  };

  const renderAddressSelectErrorMessage = () => {
    if (errors.addressLine1 && selectedAddressIndex === null) {
      return {
        helperText: `Please select an address or add a new one`,
        error: true,
      };
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <TextField
          label='First Name'
          {...getCommonFormProps('firstName')}
          defaultValue={credentials?.fullName?.firstName}
        />

        <TextField
          label='Last Name'
          {...getCommonFormProps('lastName')}
          defaultValue={credentials?.fullName?.lastName}
        />
        <SelectInput
          InputProps={{
            label: 'Select the address',
            ...renderAddressSelectErrorMessage(),
          }}
          options={buildAddressOptions}
          onChange={handleSelectAddressOption}
        />

        <When value={selectedAddressIndex !== null}>
          <TextField
            label='Address Line 1'
            {...getCommonFormProps('addressLine1')}
            disabled={!isAddingNewAddress}
          />

          <TextField
            label='City'
            {...getCommonFormProps('city')}
            disabled={!isAddingNewAddress}
          />
          <TextField
            label='State'
            {...getCommonFormProps('state')}
            disabled={!isAddingNewAddress}
          />
          <TextField
            label='ZIP Code'
            {...getCommonFormProps('zip')}
            disabled={!isAddingNewAddress}
          />
          <TextField
            label='Country'
            {...getCommonFormProps('country')}
            disabled={!isAddingNewAddress}
          />
        </When>

        <Controller
          control={control}
          name='ssn'
          defaultValue={credentials?.ssn}
          render={({ field: { onChange, value } }) => (
            <SSNInput
              onChange={onChange}
              value={value}
              error={!!errors.ssn}
              helperText={errors.ssn?.message?.toString()}
            />
          )}
        />

        <Button type='submit' variant='contained' size='large'>
          Sign up
        </Button>
      </Stack>
    </Box>
  );
}
