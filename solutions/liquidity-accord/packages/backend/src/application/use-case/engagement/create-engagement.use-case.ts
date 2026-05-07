import { randomUUID } from 'crypto';
import { Engagement } from '../../../domain/engagement/model/engagement.js';
import { EngagementStatus } from '../../../domain/engagement/model/engagement-status.enum.js';
import type { IEngagementRepository } from '../../../domain/engagement/repository/engagement.repository.js';
import type { CreateEngagementDto } from '../../dto/engagement/create-engagement.dto.js';
import {
  toEngagementResponse,
  type EngagementResponse,
} from '../../dto/engagement/engagement-response.dto.js';

export class CreateEngagementUseCase {
  constructor(private readonly repo: IEngagementRepository) {}

  async execute(dto: CreateEngagementDto, userId: string): Promise<EngagementResponse> {
    const now = new Date();
    const engagement = new Engagement({
      id: randomUUID(),
      publicId: `eng_${randomUUID().slice(0, 12)}`,
      issuerUserId: userId,
      issuerAddress: dto.issuer_address,
      mmAddress: dto.mm_address,
      venue: dto.venue,
      pairSymbol: dto.pair_symbol,
      kpiConfigHash: dto.kpi_config_hash,
      spreadMaxBps: dto.spread_max_bps,
      depthMinUsd: dto.depth_min_usd,
      uptimeMinBps: dto.uptime_min_bps,
      manipulationMaxBps: dto.manipulation_max_bps,
      weightSpreadBps: dto.weight_spread_bps,
      weightDepthBps: dto.weight_depth_bps,
      weightUptimeBps: dto.weight_uptime_bps,
      weightManipulationBps: dto.weight_manipulation_bps,
      startDate: new Date(dto.start_date),
      endDate: new Date(dto.end_date),
      status: EngagementStatus.DRAFT,
      createdAt: now,
      updatedAt: now,
    });
    await this.repo.save(engagement);
    return toEngagementResponse(engagement);
  }
}
