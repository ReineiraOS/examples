import type { IMMProfileRepository } from '../../../domain/mm-profile/repository/mm-profile.repository.js';
import {
  toMMProfileResponse,
  type MMProfileResponse,
} from '../../dto/mm-profile/mm-profile-response.dto.js';

export class GetMMProfileByIdUseCase {
  constructor(private readonly repo: IMMProfileRepository) {}

  async execute(publicId: string): Promise<MMProfileResponse | null> {
    const p = await this.repo.findByPublicId(publicId);
    return p ? toMMProfileResponse(p) : null;
  }
}
