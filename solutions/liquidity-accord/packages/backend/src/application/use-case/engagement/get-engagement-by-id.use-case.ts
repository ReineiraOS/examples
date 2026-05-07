import type { IEngagementRepository } from '../../../domain/engagement/repository/engagement.repository.js';
import {
  toEngagementResponse,
  type EngagementResponse,
} from '../../dto/engagement/engagement-response.dto.js';

export class GetEngagementByIdUseCase {
  constructor(private readonly repo: IEngagementRepository) {}

  async execute(publicId: string): Promise<EngagementResponse | null> {
    const engagement = await this.repo.findByPublicId(publicId);
    return engagement ? toEngagementResponse(engagement) : null;
  }
}
