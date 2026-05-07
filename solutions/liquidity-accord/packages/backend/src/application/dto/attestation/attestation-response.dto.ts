import { z } from 'zod';
import type { Attestation } from '../../../domain/attestation/model/attestation.js';

export const AttestationResponseSchema = z.object({
  public_id: z.string(),
  engagement_public_id: z.string(),
  window_start: z.string(),
  window_end: z.string(),
  kpi_snapshot_hash: z.string(),
  spread_bps: z.number().optional(),
  depth_usd: z.number().optional(),
  uptime_bps: z.number().optional(),
  manipulation_bps: z.number().optional(),
  coordinator_signatures_count: z.number(),
  aggregate_score_bps: z.number().optional(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type AttestationResponse = z.infer<typeof AttestationResponseSchema>;

export function toAttestationResponse(a: Attestation): AttestationResponse {
  return {
    public_id: a.publicId,
    engagement_public_id: a.engagementPublicId,
    window_start: a.windowStart.toISOString(),
    window_end: a.windowEnd.toISOString(),
    kpi_snapshot_hash: a.kpiSnapshotHash,
    spread_bps: a.spreadBps,
    depth_usd: a.depthUsd,
    uptime_bps: a.uptimeBps,
    manipulation_bps: a.manipulationBps,
    coordinator_signatures_count: a.coordinatorSignatures.length,
    aggregate_score_bps: a.aggregateScoreBps,
    status: a.status,
    created_at: a.createdAt.toISOString(),
    updated_at: a.updatedAt.toISOString(),
  };
}
