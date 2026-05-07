import type { IAttestationRepository } from '../../../domain/attestation/repository/attestation.repository.js';
import {
  toAttestationResponse,
  type AttestationResponse,
} from '../../dto/attestation/attestation-response.dto.js';

export class GetAttestationByIdUseCase {
  constructor(private readonly repo: IAttestationRepository) {}

  async execute(publicId: string): Promise<AttestationResponse | null> {
    const a = await this.repo.findByPublicId(publicId);
    return a ? toAttestationResponse(a) : null;
  }
}
