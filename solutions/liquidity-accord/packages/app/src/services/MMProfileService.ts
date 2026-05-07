import { httpClient } from '@/http-client/HttpClient';

export interface CreateMMProfileRequest {
  operator_address: string;
  name: string;
  tier?: 'UNCERTIFIED' | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  certified_since?: string;
  certification_expiry?: string;
  supported_pairs?: string[];
  website?: string;
}

export interface MMProfileResponse {
  public_id: string;
  operator_address: string;
  name: string;
  tier: string;
  certified_since?: string;
  certification_expiry?: string;
  supported_pairs: string[];
  cumulative_engagements: number;
  cumulative_score_bps?: number;
  website?: string;
  created_at: string;
  updated_at: string;
}

export class MMProfileService {
  static async create(dto: CreateMMProfileRequest): Promise<MMProfileResponse> {
    const { data } = await httpClient.post<MMProfileResponse>('/v1/mm-profiles', dto);
    return data;
  }

  static async list(params: { limit?: number } = {}): Promise<{ items: MMProfileResponse[] }> {
    const { data } = await httpClient.get<{ items: MMProfileResponse[] }>('/v1/mm-profiles', { params });
    return data;
  }

  static async getById(publicId: string): Promise<MMProfileResponse> {
    const { data } = await httpClient.get<MMProfileResponse>(`/v1/mm-profiles/${publicId}`);
    return data;
  }
}
