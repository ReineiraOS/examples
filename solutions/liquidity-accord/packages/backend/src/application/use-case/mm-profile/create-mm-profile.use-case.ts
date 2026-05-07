import { randomUUID } from 'crypto';
import { MMProfile } from '../../../domain/mm-profile/model/mm-profile.js';
import { MMTier } from '../../../domain/mm-profile/model/mm-tier.enum.js';
import type { IMMProfileRepository } from '../../../domain/mm-profile/repository/mm-profile.repository.js';
import type { CreateMMProfileDto } from '../../dto/mm-profile/create-mm-profile.dto.js';
import {
  toMMProfileResponse,
  type MMProfileResponse,
} from '../../dto/mm-profile/mm-profile-response.dto.js';

export class CreateMMProfileUseCase {
  constructor(private readonly repo: IMMProfileRepository) {}

  async execute(dto: CreateMMProfileDto): Promise<MMProfileResponse> {
    const now = new Date();
    const profile = new MMProfile({
      id: randomUUID(),
      publicId: `mm_${randomUUID().slice(0, 12)}`,
      operatorAddress: dto.operator_address,
      name: dto.name,
      tier: (dto.tier ?? 'UNCERTIFIED') as MMTier,
      certifiedSince: dto.certified_since ? new Date(dto.certified_since) : undefined,
      certificationExpiry: dto.certification_expiry ? new Date(dto.certification_expiry) : undefined,
      supportedPairs: dto.supported_pairs ?? [],
      cumulativeEngagements: 0,
      website: dto.website,
      createdAt: now,
      updatedAt: now,
    });
    await this.repo.save(profile);
    return toMMProfileResponse(profile);
  }
}
