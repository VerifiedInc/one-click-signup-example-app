import {
  fieldSchema,
  SSNSchema,
  stateSchema,
} from '@verifiedinc/shared-ui-elements/validations';
import * as z from 'zod';

export const signupOneClickFormSchema = z.object({
  firstName: fieldSchema,
  lastName: fieldSchema,
  ssn: SSNSchema,
  addressLine1: fieldSchema,
  city: fieldSchema,
  state: stateSchema,
  zip: fieldSchema,
  country: fieldSchema,
});

export type SignupOneClickForm = z.infer<typeof signupOneClickFormSchema>;
