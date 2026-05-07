import type { MMProfile } from '../../../domain/mm-profile/model/mm-profile.js';
import type { IMMProfileRepository } from '../../../domain/mm-profile/repository/mm-profile.repository.js';

export class MemoryMMProfileRepository implements IMMProfileRepository {
  private readonly store = new Map<string, MMProfile>();

  async findByPublicId(publicId: string): Promise<MMProfile | null> {
    for (const p of this.store.values()) {
      if (p.publicId === publicId) return p;
    }
    return null;
  }

  async findByOperator(operatorAddress: string): Promise<MMProfile | null> {
    const needle = operatorAddress.toLowerCase();
    for (const p of this.store.values()) {
      if (p.operatorAddress.toLowerCase() === needle) return p;
    }
    return null;
  }

  async list(limit = 50): Promise<MMProfile[]> {
    return Array.from(this.store.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async save(p: MMProfile): Promise<void> {
    this.store.set(p.id, p);
  }
}
