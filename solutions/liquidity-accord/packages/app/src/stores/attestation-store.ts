import { create } from 'zustand';
import {
  AttestationService,
  type CreateAttestationRequest,
  type AttestationResponse,
} from '@/services/AttestationService';

interface AttestationState {
  attestations: AttestationResponse[];
  loading: boolean;
  initialized: boolean;
  fetchAttestations: (engagementPublicId?: string) => Promise<void>;
  createAttestation: (req: CreateAttestationRequest) => Promise<AttestationResponse>;
}

export const useAttestationStore = create<AttestationState>((set, get) => ({
  attestations: [],
  loading: false,
  initialized: false,

  fetchAttestations: async (engagementPublicId) => {
    if (!get().initialized) set({ loading: true });
    try {
      const result = await AttestationService.list({
        engagement_public_id: engagementPublicId,
        limit: 100,
      });
      set({ attestations: result.items, initialized: true });
    } finally {
      set({ loading: false });
    }
  },

  createAttestation: async (req) => {
    const attestation = await AttestationService.create(req);
    set((state) => ({ attestations: [attestation, ...state.attestations] }));
    return attestation;
  },
}));
