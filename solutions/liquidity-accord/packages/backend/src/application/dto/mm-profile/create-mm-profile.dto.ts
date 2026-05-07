import { z } from 'zod';

export const CreateMMProfileDtoSchema = z.object({
  operator_address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  name: z.string().min(1).max(200),
  tier: z.enum(['UNCERTIFIED', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM']).optional(),
  certified_since: z.string().datetime().optional(),
  certification_expiry: z.string().datetime().optional(),
  supported_pairs: z.array(z.string().min(1).max(32)).optional(),
  website: z.string().url().optional(),
});
export type CreateMMProfileDto = z.infer<typeof CreateMMProfileDtoSchema>;
