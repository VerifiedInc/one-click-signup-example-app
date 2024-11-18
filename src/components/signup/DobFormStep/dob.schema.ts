import { getUnixSchema } from '@verifiedinc-public/shared-ui-elements';
import * as z from 'zod';

export const dobFormSchema = z.object({
  dob: getUnixSchema('Invalid Date of Birth'),
});

export type DobForm = z.infer<typeof dobFormSchema>;
