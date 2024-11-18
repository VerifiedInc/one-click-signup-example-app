import { SSNSchema } from '@/utils/ssn';
import {
  fieldSchema,
  stateSchema,
} from '@verifiedinc-public/shared-ui-elements';
import * as z from 'zod';

export const signupFormSchema = z.object({
  firstName: fieldSchema,
  lastName: fieldSchema,
  dob: z.date().refine((date) => date.getTime() < Date.now(), {
    message: 'Date of birth must be in the past',
  }),
  ssn: SSNSchema,
  addressLine1: fieldSchema,
  city: fieldSchema,
  state: stateSchema,
  zip: fieldSchema,
  country: fieldSchema,
});

export type SimpleSignupForm = z.infer<typeof signupFormSchema>;
