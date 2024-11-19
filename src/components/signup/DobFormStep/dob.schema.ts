import { USDateSchema } from '@verifiedinc-public/shared-ui-elements';
import * as z from 'zod';

export const dobFormSchema = z.object({
  dob: USDateSchema,
});

export type DobForm = z.infer<typeof dobFormSchema>;
