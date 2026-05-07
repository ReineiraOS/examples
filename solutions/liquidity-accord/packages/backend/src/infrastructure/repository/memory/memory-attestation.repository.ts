import type { Attestation } from '../../../domain/attestation/model/attestation.js';
import type { IAttestationRepository } from '../../../domain/attestation/repository/attestation.repository.js';

export class MemoryAttestationRepository implements IAttestationRepository {
  private readonly store = new Map<string, Attestation>();

  async findByPublicId(publicId: string): Promise<Attestation | null> {
    for (const a of this.store.values()) {
      if (a.publicId === publicId) return a;
    }
    return null;
  }

  async findByEngagement(engagementPublicId: string, limit = 50): Promise<Attestation[]> {
    const results: Attestation[] = [];
    for (const a of this.store.values()) {
      if (a.engagementPublicId === engagementPublicId) results.push(a);
      if (results.length >= limit) break;
    }
    return results.sort((a, b) => b.windowStart.getTime() - a.windowStart.getTime());
  }

  async list(limit = 50): Promise<Attestation[]> {
    return Array.from(this.store.values())
      .sort((a, b) => b.windowStart.getTime() - a.windowStart.getTime())
      .slice(0, limit);
  }

  async save(a: Attestation): Promise<void> {
    this.store.set(a.id, a);
  }
}
