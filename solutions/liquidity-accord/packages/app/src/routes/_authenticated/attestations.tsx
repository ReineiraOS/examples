import { useEffect, useState } from 'react';
import { useAttestationStore } from '@/stores/attestation-store';
import type { CreateAttestationRequest } from '@/services/AttestationService';
import { AttestationForm } from '@/components/features/attestation-form';
import { AttestationList } from '@/components/features/attestation-list';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function AttestationsPage() {
  const attestations = useAttestationStore((s) => s.attestations);
  const loading = useAttestationStore((s) => s.loading);
  const fetchAttestations = useAttestationStore((s) => s.fetchAttestations);
  const createAttestation = useAttestationStore((s) => s.createAttestation);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAttestations();
  }, [fetchAttestations]);

  async function handleCreate(data: CreateAttestationRequest) {
    await createAttestation(data);
    setShowForm(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Attestations</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Coordinator-signed KPI snapshots. ≥3 signatures → quorum.
          </p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Cancel' : 'Submit Attestation'}
        </Button>
      </div>

      {showForm && (
        <Card title="Submit Attestation">
          <AttestationForm onSubmit={handleCreate} />
        </Card>
      )}

      <Card>
        <AttestationList attestations={attestations} loading={loading} />
      </Card>
    </div>
  );
}
