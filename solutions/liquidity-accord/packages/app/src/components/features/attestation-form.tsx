import { useState, type FormEvent } from 'react';
import type { CreateAttestationRequest } from '@/services/AttestationService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AttestationFormProps {
  onSubmit: (data: CreateAttestationRequest) => Promise<void> | void;
}

export function AttestationForm({ onSubmit }: AttestationFormProps) {
  const [engagementPublicId, setEngagementPublicId] = useState('');
  const [windowStart, setWindowStart] = useState('');
  const [windowEnd, setWindowEnd] = useState('');
  const [kpiSnapshotHash, setKpiSnapshotHash] = useState('');
  const [spreadBps, setSpreadBps] = useState('');
  const [depthUsd, setDepthUsd] = useState('');
  const [uptimeBps, setUptimeBps] = useState('');
  const [manipulationBps, setManipulationBps] = useState('');
  const [coordinatorSigs, setCoordinatorSigs] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const sigs = coordinatorSigs
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!engagementPublicId || !windowStart || !windowEnd || !kpiSnapshotHash || sigs.length === 0) {
      setError('Engagement, window, hash, and at least one signature are required');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        engagement_public_id: engagementPublicId,
        window_start: new Date(windowStart).toISOString(),
        window_end: new Date(windowEnd).toISOString(),
        kpi_snapshot_hash: kpiSnapshotHash,
        spread_bps: spreadBps ? Number(spreadBps) : undefined,
        depth_usd: depthUsd ? Number(depthUsd) : undefined,
        uptime_bps: uptimeBps ? Number(uptimeBps) : undefined,
        manipulation_bps: manipulationBps ? Number(manipulationBps) : undefined,
        coordinator_signatures: sigs,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit attestation');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        label="Engagement Public ID *"
        placeholder="eng_…"
        value={engagementPublicId}
        onChange={(e) => setEngagementPublicId(e.target.value)}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Window Start *"
          type="datetime-local"
          value={windowStart}
          onChange={(e) => setWindowStart(e.target.value)}
        />
        <Input
          label="Window End *"
          type="datetime-local"
          value={windowEnd}
          onChange={(e) => setWindowEnd(e.target.value)}
        />
      </div>
      <Input
        label="KPI Snapshot Hash *"
        placeholder="0x…"
        value={kpiSnapshotHash}
        onChange={(e) => setKpiSnapshotHash(e.target.value)}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          label="Spread (bps)"
          type="number"
          value={spreadBps}
          onChange={(e) => setSpreadBps(e.target.value)}
        />
        <Input
          label="Depth (USD)"
          type="number"
          value={depthUsd}
          onChange={(e) => setDepthUsd(e.target.value)}
        />
        <Input
          label="Uptime (bps)"
          type="number"
          value={uptimeBps}
          onChange={(e) => setUptimeBps(e.target.value)}
        />
        <Input
          label="Manipulation (bps)"
          type="number"
          value={manipulationBps}
          onChange={(e) => setManipulationBps(e.target.value)}
        />
      </div>
      <Input
        label="Coordinator Signatures (comma-separated) *"
        placeholder="0xsig1, 0xsig2, 0xsig3"
        value={coordinatorSigs}
        onChange={(e) => setCoordinatorSigs(e.target.value)}
      />
      <p className="text-xs text-[var(--text-muted)]">
        Quorum of ≥3 Coordinator signatures promotes the attestation to QUORUM_REACHED.
      </p>
      {error && <p className="text-sm text-[var(--status-error)]">{error}</p>}
      <div className="flex justify-end">
        <Button type="submit" loading={submitting}>
          Submit Attestation
        </Button>
      </div>
    </form>
  );
}
