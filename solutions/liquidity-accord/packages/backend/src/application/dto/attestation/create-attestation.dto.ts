import { z } from 'zod';

export const CreateAttestationDtoSchema = z.object({
  engagement_public_id: z.string().min(1).max(64),
  window_start: z.string().datetime(),
  window_end: z.string().datetime(),
  kpi_snapshot_hash: z.string().min(1).max(128),
  spread_bps: z.number().int().min(0).max(10000).optional(),
  depth_usd: z.number().int().min(0).optional(),
  uptime_bps: z.number().int().min(0).max(10000).optional(),
  manipulation_bps: z.number().int().min(0).max(10000).optional(),
  coordinator_signatures: z.array(z.string().min(1)).min(1),
});
export type CreateAttestationDto = z.infer<typeof CreateAttestationDtoSchema>;
