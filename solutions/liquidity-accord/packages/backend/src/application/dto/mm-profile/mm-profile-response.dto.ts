import { z } from 'zod';
import type { MMProfile } from '../../../domain/mm-profile/model/mm-profile.js';

export const MMProfileResponseSchema = z.object({
  public_id: z.string(),
  operator_address: z.string(),
  name: z.string(),
  tier: z.string(),
  certified_since: z.string().optional(),
  certification_expiry: z.string().optional(),
  supported_pairs: z.array(z.string()),
  cumulative_engagements: z.number(),
  cumulative_score_bps: z.number().optional(),
  website: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type MMProfileResponse = z.infer<typeof MMProfileResponseSchema>;

export function toMMProfileResponse(p: MMProfile): MMProfileResponse {
  return {
    public_id: p.publicId,
    operator_address: p.operatorAddress,
    name: p.name,
    tier: p.tier,
    certified_since: p.certifiedSince?.toISOString(),
    certification_expiry: p.certificationExpiry?.toISOString(),
    supported_pairs: p.supportedPairs,
    cumulative_engagements: p.cumulativeEngagements,
    cumulative_score_bps: p.cumulativeScoreBps,
    website: p.website,
    created_at: p.createdAt.toISOString(),
    updated_at: p.updatedAt.toISOString(),
  };
}
