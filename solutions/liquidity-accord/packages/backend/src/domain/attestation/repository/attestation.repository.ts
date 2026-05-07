import type { Attestation } from '../model/attestation.js';

export interface IAttestationRepository {
  findByPublicId(publicId: string): Promise<Attestation | null>;
  findByEngagement(engagementPublicId: string, limit?: number): Promise<Attestation[]>;
  list(limit?: number): Promise<Attestation[]>;
  save(attestation: Attestation): Promise<void>;
}
