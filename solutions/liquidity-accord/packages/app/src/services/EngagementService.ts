import { httpClient } from '@/http-client/HttpClient';

export interface CreateEngagementRequest {
  issuer_address: string;
  mm_address: string;
  venue: string;
  pair_symbol: string;
  kpi_config_hash: string;
  spread_max_bps: number;
  depth_min_usd: number;
  uptime_min_bps: number;
  manipulation_max_bps: number;
  weight_spread_bps: number;
  weight_depth_bps: number;
  weight_uptime_bps: number;
  weight_manipulation_bps: number;
  start_date: string;
  end_date: string;
}

export interface EngagementResponse {
  public_id: string;
  issuer_address: string;
  mm_address: string;
  venue: string;
  pair_symbol: string;
  kpi_config_hash: string;
  spread_max_bps: number;
  depth_min_usd: number;
  uptime_min_bps: number;
  manipulation_max_bps: number;
  weight_spread_bps: number;
  weight_depth_bps: number;
  weight_uptime_bps: number;
  weight_manipulation_bps: number;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export class EngagementService {
  static async create(dto: CreateEngagementRequest): Promise<EngagementResponse> {
    const { data } = await httpClient.post<EngagementResponse>('/v1/engagements', dto);
    return data;
  }

  static async list(params: { limit?: number } = {}): Promise<{ items: EngagementResponse[] }> {
    const { data } = await httpClient.get<{ items: EngagementResponse[] }>('/v1/engagements', { params });
    return data;
  }

  static async getById(publicId: string): Promise<EngagementResponse> {
    const { data } = await httpClient.get<EngagementResponse>(`/v1/engagements/${publicId}`);
    return data;
  }
}
