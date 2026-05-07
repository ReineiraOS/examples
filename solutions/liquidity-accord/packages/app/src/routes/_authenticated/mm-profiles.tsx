import { useEffect, useState } from 'react';
import { useMMProfileStore } from '@/stores/mm-profile-store';
import type { CreateMMProfileRequest } from '@/services/MMProfileService';
import { MMProfileForm } from '@/components/features/mm-profile-form';
import { MMProfileList } from '@/components/features/mm-profile-list';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function MMProfilesPage() {
  const profiles = useMMProfileStore((s) => s.profiles);
  const loading = useMMProfileStore((s) => s.loading);
  const fetchProfiles = useMMProfileStore((s) => s.fetchProfiles);
  const createProfile = useMMProfileStore((s) => s.createProfile);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  async function handleCreate(data: CreateMMProfileRequest) {
    await createProfile(data);
    setShowForm(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">MM Registry</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            NGFA-certified market-makers with verifiable on-chain performance history.
          </p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Cancel' : 'Add MM'}
        </Button>
      </div>

      {showForm && (
        <Card title="Add MM Profile">
          <MMProfileForm onSubmit={handleCreate} />
        </Card>
      )}

      <Card>
        <MMProfileList profiles={profiles} loading={loading} />
      </Card>
    </div>
  );
}
