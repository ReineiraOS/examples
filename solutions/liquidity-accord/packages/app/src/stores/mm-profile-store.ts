import { create } from 'zustand';
import {
  MMProfileService,
  type CreateMMProfileRequest,
  type MMProfileResponse,
} from '@/services/MMProfileService';

interface MMProfileState {
  profiles: MMProfileResponse[];
  loading: boolean;
  initialized: boolean;
  fetchProfiles: () => Promise<void>;
  createProfile: (req: CreateMMProfileRequest) => Promise<MMProfileResponse>;
}

export const useMMProfileStore = create<MMProfileState>((set, get) => ({
  profiles: [],
  loading: false,
  initialized: false,

  fetchProfiles: async () => {
    if (!get().initialized) set({ loading: true });
    try {
      const result = await MMProfileService.list({ limit: 100 });
      set({ profiles: result.items, initialized: true });
    } finally {
      set({ loading: false });
    }
  },

  createProfile: async (req) => {
    const profile = await MMProfileService.create(req);
    set((state) => ({ profiles: [profile, ...state.profiles] }));
    return profile;
  },
}));
