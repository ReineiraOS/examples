import type { Engagement } from '../model/engagement.js';

export interface IEngagementRepository {
  findById(id: string): Promise<Engagement | null>;
  findByPublicId(publicId: string): Promise<Engagement | null>;
  findByIssuer(issuerUserId: string, limit?: number): Promise<Engagement[]>;
  list(limit?: number): Promise<Engagement[]>;
  save(engagement: Engagement): Promise<void>;
}
