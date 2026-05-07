import { z } from 'zod';

export const CreateEngagementDtoSchema = z
  .object({
    issuer_address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    mm_address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    venue: z.string().min(1).max(64),
    pair_symbol: z.string().min(1).max(32),
    kpi_config_hash: z.string().min(1).max(128),
    spread_max_bps: z.number().int().min(0).max(10000),
    depth_min_usd: z.number().int().min(0),
    uptime_min_bps: z.number().int().min(0).max(10000),
    manipulation_max_bps: z.number().int().min(0).max(10000),
    weight_spread_bps: z.number().int().min(0).max(10000),
    weight_depth_bps: z.number().int().min(0).max(10000),
    weight_uptime_bps: z.number().int().min(0).max(10000),
    weight_manipulation_bps: z.number().int().min(0).max(10000),
    start_date: z.string().datetime(),
    end_date: z.string().datetime(),
  })
  .refine(
    (v) =>
      v.weight_spread_bps + v.weight_depth_bps + v.weight_uptime_bps + v.weight_manipulation_bps === 10000,
    { message: 'KPI weights must sum to 10000 bps' },
  );
export type CreateEngagementDto = z.infer<typeof CreateEngagementDtoSchema>;
