import { MMTier } from './mm-tier.enum.js';

export interface MMProfileParams {
  id: string;
  publicId: string;
  operatorAddress: string;
  name: string;
  tier: MMTier;
  certifiedSince?: Date;
  certificationExpiry?: Date;
  supportedPairs: string[];
  cumulativeEngagements: number;
  cumulativeScoreBps?: number;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MMProfile {
  readonly id: string;
  readonly publicId: string;
  readonly operatorAddress: string;
  readonly name: string;
  tier: MMTier;
  certifiedSince?: Date;
  certificationExpiry?: Date;
  supportedPairs: string[];
  cumulativeEngagements: number;
  cumulativeScoreBps?: number;
  website?: string;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor(params: MMProfileParams) {
    this.id = params.id;
    this.publicId = params.publicId;
    this.operatorAddress = params.operatorAddress;
    this.name = params.name;
    this.tier = params.tier;
    this.certifiedSince = params.certifiedSince;
    this.certificationExpiry = params.certificationExpiry;
    this.supportedPairs = params.supportedPairs;
    this.cumulativeEngagements = params.cumulativeEngagements;
    this.cumulativeScoreBps = params.cumulativeScoreBps;
    this.website = params.website;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
