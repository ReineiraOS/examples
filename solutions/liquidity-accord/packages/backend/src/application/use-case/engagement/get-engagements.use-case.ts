import type { IEngagementRepository } from '../../../domain/engagement/repository/engagement.repository.js';
import {
  toEngagementResponse,
  type EngagementResponse,
} from '../../dto/engagement/engagement-response.dto.js';

export class GetEngagementsUseCase {
  constructor(private readonly repo: IEngagementRepository) {}

  async execute(userId: string, limit = 50): Promise<{ items: EngagementResponse[] }> {
    const items = await this.repo.findByIssuer(userId, limit);
    return { items: items.map(toEngagementResponse) };
  }
}
