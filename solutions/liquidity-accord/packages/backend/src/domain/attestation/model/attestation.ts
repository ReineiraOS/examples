import { AttestationStatus } from './attestation-status.enum.js';

export interface AttestationParams {
  id: string;
  publicId: string;
  engagementPublicId: string;
  windowStart: Date;
  windowEnd: Date;
  kpiSnapshotHash: string;
  spreadBps?: number;
  depthUsd?: number;
  uptimeBps?: number;
  manipulationBps?: number;
  coordinatorSignatures: string[];
  aggregateScoreBps?: number;
  status: AttestationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Attestation {
  readonly id: string;
  readonly publicId: string;
  readonly engagementPublicId: string;
  readonly windowStart: Date;
  readonly windowEnd: Date;
  readonly kpiSnapshotHash: string;
  spreadBps?: number;
  depthUsd?: number;
  uptimeBps?: number;
  manipulationBps?: number;
  coordinatorSignatures: string[];
  aggregateScoreBps?: number;
  status: AttestationStatus;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor(params: AttestationParams) {
    this.id = params.id;
    this.publicId = params.publicId;
    this.engagementPublicId = params.engagementPublicId;
    this.windowStart = params.windowStart;
    this.windowEnd = params.windowEnd;
    this.kpiSnapshotHash = params.kpiSnapshotHash;
    this.spreadBps = params.spreadBps;
    this.depthUsd = params.depthUsd;
    this.uptimeBps = params.uptimeBps;
    this.manipulationBps = params.manipulationBps;
    this.coordinatorSignatures = params.coordinatorSignatures;
    this.aggregateScoreBps = params.aggregateScoreBps;
    this.status = params.status;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
