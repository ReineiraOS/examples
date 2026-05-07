import { httpClient } from '@/http-client/HttpClient';

export interface CreateAttestationRequest {
  engagement_public_id: string;
  window_start: string;
  window_end: string;
  kpi_snapshot_hash: string;
  spread_bps?: number;
  depth_usd?: number;
  uptime_bps?: number;
  manipulation_bps?: number;
  coordinator_signatures: string[];
}

export interface AttestationResponse {
  public_id: string;
  engagement_public_id: string;
  window_start: string;
  window_end: string;
  kpi_snapshot_hash: string;
  spread_bps?: number;
  depth_usd?: number;
  uptime_bps?: number;
  manipulation_bps?: number;
  coordinator_signatures_count: number;
  aggregate_score_bps?: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export class AttestationService {
  static async create(dto: CreateAttestationRequest): Promise<AttestationResponse> {
    const { data } = await httpClient.post<AttestationResponse>('/v1/attestations', dto);
    return data;
  }

  static async list(
    params: { engagement_public_id?: string; limit?: number } = {},
  ): Promise<{ items: AttestationResponse[] }> {
    const { data } = await httpClient.get<{ items: AttestationResponse[] }>('/v1/attestations', { params });
    return data;
  }

  static async getById(publicId: string): Promise<AttestationResponse> {
    const { data } = await httpClient.get<AttestationResponse>(`/v1/attestations/${publicId}`);
    return data;
  }
}
