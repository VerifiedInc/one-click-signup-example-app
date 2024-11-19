import {
  birthDateSchemaWithPastOnlyValidation,
  fieldSchema,
  MaskedAndUnmaskedSSNSchema,
  stateSchema,
} from '@verifiedinc-public/shared-ui-elements';
import * as z from 'zod';

export const signupFormSchema = z.object({
  firstName: fieldSchema,
  lastName: fieldSchema,
  dob: birthDateSchemaWithPastOnlyValidation,
  ssn: MaskedAndUnmaskedSSNSchema,
  addressLine1: fieldSchema,
  city: fieldSchema,
  state: stateSchema,
  zip: fieldSchema,
  country: fieldSchema,
});

export type SimpleSignupForm = z.infer<typeof signupFormSchema>;
