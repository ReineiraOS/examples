import type { Engagement } from '../../../domain/engagement/model/engagement.js';
import type { IEngagementRepository } from '../../../domain/engagement/repository/engagement.repository.js';

export class MemoryEngagementRepository implements IEngagementRepository {
  private readonly store = new Map<string, Engagement>();

  async findById(id: string): Promise<Engagement | null> {
    return this.store.get(id) ?? null;
  }

  async findByPublicId(publicId: string): Promise<Engagement | null> {
    for (const e of this.store.values()) {
      if (e.publicId === publicId) return e;
    }
    return null;
  }

  async findByIssuer(issuerUserId: string, limit = 50): Promise<Engagement[]> {
    const results: Engagement[] = [];
    for (const e of this.store.values()) {
      if (e.issuerUserId === issuerUserId) results.push(e);
      if (results.length >= limit) break;
    }
    return results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async list(limit = 50): Promise<Engagement[]> {
    return Array.from(this.store.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async save(engagement: Engagement): Promise<void> {
    this.store.set(engagement.id, engagement);
  }
}
