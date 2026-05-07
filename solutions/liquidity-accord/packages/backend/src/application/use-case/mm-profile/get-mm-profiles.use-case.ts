import type { IMMProfileRepository } from '../../../domain/mm-profile/repository/mm-profile.repository.js';
import {
  toMMProfileResponse,
  type MMProfileResponse,
} from '../../dto/mm-profile/mm-profile-response.dto.js';

export class GetMMProfilesUseCase {
  constructor(private readonly repo: IMMProfileRepository) {}

  async execute(limit = 50): Promise<{ items: MMProfileResponse[] }> {
    const items = await this.repo.list(limit);
    return { items: items.map(toMMProfileResponse) };
  }
}
