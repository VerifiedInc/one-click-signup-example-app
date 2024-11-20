import {
  getDateSchemaWithPastValidation,
  fieldSchema,
  MaskedAndUnmaskedSSNSchema,
  stateSchema,
} from '@verifiedinc-public/shared-ui-elements';
import * as z from 'zod';

export const signupOneClickFormSchema = z.object({
  firstName: fieldSchema,
  lastName: fieldSchema,
  ssn: MaskedAndUnmaskedSSNSchema,
  dob: getDateSchemaWithPastValidation('Birthday must be in the past'),
  addressLine1: fieldSchema,
  city: fieldSchema,
  state: stateSchema,
  zip: fieldSchema,
  country: fieldSchema,
});

export type SignupOneClickForm = z.infer<typeof signupOneClickFormSchema>;
