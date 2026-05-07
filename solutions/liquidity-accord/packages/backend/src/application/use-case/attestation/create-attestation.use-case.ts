import { randomUUID } from 'crypto';
import { Attestation } from '../../../domain/attestation/model/attestation.js';
import { AttestationStatus } from '../../../domain/attestation/model/attestation-status.enum.js';
import type { IAttestationRepository } from '../../../domain/attestation/repository/attestation.repository.js';
import type { CreateAttestationDto } from '../../dto/attestation/create-attestation.dto.js';
import {
  toAttestationResponse,
  type AttestationResponse,
} from '../../dto/attestation/attestation-response.dto.js';

const QUORUM_THRESHOLD = 3;

export class CreateAttestationUseCase {
  constructor(private readonly repo: IAttestationRepository) {}

  async execute(dto: CreateAttestationDto): Promise<AttestationResponse> {
    const now = new Date();
    const quorumReached = dto.coordinator_signatures.length >= QUORUM_THRESHOLD;
    const attestation = new Attestation({
      id: randomUUID(),
      publicId: `att_${randomUUID().slice(0, 12)}`,
      engagementPublicId: dto.engagement_public_id,
      windowStart: new Date(dto.window_start),
      windowEnd: new Date(dto.window_end),
      kpiSnapshotHash: dto.kpi_snapshot_hash,
      spreadBps: dto.spread_bps,
      depthUsd: dto.depth_usd,
      uptimeBps: dto.uptime_bps,
      manipulationBps: dto.manipulation_bps,
      coordinatorSignatures: dto.coordinator_signatures,
      status: quorumReached ? AttestationStatus.QUORUM_REACHED : AttestationStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    });
    await this.repo.save(attestation);
    return toAttestationResponse(attestation);
  }
}
