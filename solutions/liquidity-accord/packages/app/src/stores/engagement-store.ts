import { create } from 'zustand';
import {
  EngagementService,
  type CreateEngagementRequest,
  type EngagementResponse,
} from '@/services/EngagementService';

interface EngagementState {
  engagements: EngagementResponse[];
  current: EngagementResponse | null;
  loading: boolean;
  initialized: boolean;
  fetchEngagements: () => Promise<void>;
  fetchEngagement: (publicId: string) => Promise<void>;
  createEngagement: (req: CreateEngagementRequest) => Promise<EngagementResponse>;
}

export const useEngagementStore = create<EngagementState>((set, get) => ({
  engagements: [],
  current: null,
  loading: false,
  initialized: false,

  fetchEngagements: async () => {
    if (!get().initialized) set({ loading: true });
    try {
      const result = await EngagementService.list({ limit: 100 });
      set({ engagements: result.items, initialized: true });
    } finally {
      set({ loading: false });
    }
  },

  fetchEngagement: async (publicId) => {
    set({ loading: true });
    try {
      const engagement = await EngagementService.getById(publicId);
      set({ current: engagement });
    } finally {
      set({ loading: false });
    }
  },

  createEngagement: async (req) => {
    const engagement = await EngagementService.create(req);
    set((state) => ({ engagements: [engagement, ...state.engagements] }));
    return engagement;
  },
}));
