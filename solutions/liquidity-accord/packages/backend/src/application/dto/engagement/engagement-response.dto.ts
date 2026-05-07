import { z } from 'zod';
import type { Engagement } from '../../../domain/engagement/model/engagement.js';

export const EngagementResponseSchema = z.object({
  public_id: z.string(),
  issuer_address: z.string(),
  mm_address: z.string(),
  venue: z.string(),
  pair_symbol: z.string(),
  kpi_config_hash: z.string(),
  spread_max_bps: z.number(),
  depth_min_usd: z.number(),
  uptime_min_bps: z.number(),
  manipulation_max_bps: z.number(),
  weight_spread_bps: z.number(),
  weight_depth_bps: z.number(),
  weight_uptime_bps: z.number(),
  weight_manipulation_bps: z.number(),
  start_date: z.string(),
  end_date: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type EngagementResponse = z.infer<typeof EngagementResponseSchema>;

export function toEngagementResponse(e: Engagement): EngagementResponse {
  return {
    public_id: e.publicId,
    issuer_address: e.issuerAddress,
    mm_address: e.mmAddress,
    venue: e.venue,
    pair_symbol: e.pairSymbol,
    kpi_config_hash: e.kpiConfigHash,
    spread_max_bps: e.spreadMaxBps,
    depth_min_usd: e.depthMinUsd,
    uptime_min_bps: e.uptimeMinBps,
    manipulation_max_bps: e.manipulationMaxBps,
    weight_spread_bps: e.weightSpreadBps,
    weight_depth_bps: e.weightDepthBps,
    weight_uptime_bps: e.weightUptimeBps,
    weight_manipulation_bps: e.weightManipulationBps,
    start_date: e.startDate.toISOString(),
    end_date: e.endDate.toISOString(),
    status: e.status,
    created_at: e.createdAt.toISOString(),
    updated_at: e.updatedAt.toISOString(),
  };
}
