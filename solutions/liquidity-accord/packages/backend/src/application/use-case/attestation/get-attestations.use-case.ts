import type { IAttestationRepository } from '../../../domain/attestation/repository/attestation.repository.js';
import {
  toAttestationResponse,
  type AttestationResponse,
} from '../../dto/attestation/attestation-response.dto.js';

export class GetAttestationsUseCase {
  constructor(private readonly repo: IAttestationRepository) {}

  async execute(engagementPublicId?: string, limit = 50): Promise<{ items: AttestationResponse[] }> {
    const items = engagementPublicId
      ? await this.repo.findByEngagement(engagementPublicId, limit)
      : await this.repo.list(limit);
    return { items: items.map(toAttestationResponse) };
  }
}
