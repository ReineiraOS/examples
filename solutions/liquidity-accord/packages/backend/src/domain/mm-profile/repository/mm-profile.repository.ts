import type { MMProfile } from '../model/mm-profile.js';

export interface IMMProfileRepository {
  findByPublicId(publicId: string): Promise<MMProfile | null>;
  findByOperator(operatorAddress: string): Promise<MMProfile | null>;
  list(limit?: number): Promise<MMProfile[]>;
  save(profile: MMProfile): Promise<void>;
}
