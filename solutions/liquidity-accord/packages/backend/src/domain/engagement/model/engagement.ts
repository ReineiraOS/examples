import { EngagementStatus } from './engagement-status.enum.js';

export interface EngagementParams {
  id: string;
  publicId: string;
  issuerUserId: string;
  issuerAddress: string;
  mmAddress: string;
  venue: string;
  pairSymbol: string;
  kpiConfigHash: string;
  spreadMaxBps: number;
  depthMinUsd: number;
  uptimeMinBps: number;
  manipulationMaxBps: number;
  weightSpreadBps: number;
  weightDepthBps: number;
  weightUptimeBps: number;
  weightManipulationBps: number;
  startDate: Date;
  endDate: Date;
  status: EngagementStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Engagement {
  readonly id: string;
  readonly publicId: string;
  readonly issuerUserId: string;
  readonly issuerAddress: string;
  readonly mmAddress: string;
  readonly venue: string;
  readonly pairSymbol: string;
  readonly kpiConfigHash: string;
  readonly spreadMaxBps: number;
  readonly depthMinUsd: number;
  readonly uptimeMinBps: number;
  readonly manipulationMaxBps: number;
  readonly weightSpreadBps: number;
  readonly weightDepthBps: number;
  readonly weightUptimeBps: number;
  readonly weightManipulationBps: number;
  readonly startDate: Date;
  readonly endDate: Date;
  status: EngagementStatus;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor(params: EngagementParams) {
    this.id = params.id;
    this.publicId = params.publicId;
    this.issuerUserId = params.issuerUserId;
    this.issuerAddress = params.issuerAddress;
    this.mmAddress = params.mmAddress;
    this.venue = params.venue;
    this.pairSymbol = params.pairSymbol;
    this.kpiConfigHash = params.kpiConfigHash;
    this.spreadMaxBps = params.spreadMaxBps;
    this.depthMinUsd = params.depthMinUsd;
    this.uptimeMinBps = params.uptimeMinBps;
    this.manipulationMaxBps = params.manipulationMaxBps;
    this.weightSpreadBps = params.weightSpreadBps;
    this.weightDepthBps = params.weightDepthBps;
    this.weightUptimeBps = params.weightUptimeBps;
    this.weightManipulationBps = params.weightManipulationBps;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.status = params.status;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
