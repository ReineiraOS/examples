import { useEffect, useState } from 'react';
import { useEngagementStore } from '@/stores/engagement-store';
import type { CreateEngagementRequest } from '@/services/EngagementService';
import { EngagementForm } from '@/components/features/engagement-form';
import { EngagementList } from '@/components/features/engagement-list';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function EngagementsPage() {
  const engagements = useEngagementStore((s) => s.engagements);
  const loading = useEngagementStore((s) => s.loading);
  const fetchEngagements = useEngagementStore((s) => s.fetchEngagements);
  const createEngagement = useEngagementStore((s) => s.createEngagement);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEngagements();
  }, [fetchEngagements]);

  async function handleCreate(data: CreateEngagementRequest) {
    await createEngagement(data);
    setShowForm(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Engagements</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Issuer × MM performance bonds. KPI config + tranche-release terms.
          </p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Cancel' : 'New Engagement'}
        </Button>
      </div>

      {showForm && (
        <Card title="Draft Engagement">
          <EngagementForm onSubmit={handleCreate} />
        </Card>
      )}

      <Card>
        <EngagementList engagements={engagements} loading={loading} />
      </Card>
    </div>
  );
}
