import { useState, type FormEvent } from 'react';
import type { CreateEngagementRequest } from '@/services/EngagementService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EngagementFormProps {
  onSubmit: (data: CreateEngagementRequest) => Promise<void> | void;
}

const WEIGHT_DEFAULTS = { spread: 3500, depth: 3500, uptime: 1500, manipulation: 1500 };

export function EngagementForm({ onSubmit }: EngagementFormProps) {
  const [issuerAddress, setIssuerAddress] = useState('');
  const [mmAddress, setMmAddress] = useState('');
  const [venue, setVenue] = useState('coinbase');
  const [pairSymbol, setPairSymbol] = useState('');
  const [kpiConfigHash, setKpiConfigHash] = useState('');
  const [spreadMaxBps, setSpreadMaxBps] = useState('20');
  const [depthMinUsd, setDepthMinUsd] = useState('500000');
  const [uptimeMinBps, setUptimeMinBps] = useState('9900');
  const [manipulationMaxBps, setManipulationMaxBps] = useState('100');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!issuerAddress || !mmAddress || !pairSymbol || !kpiConfigHash || !startDate || !endDate) {
      setError('All fields are required');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        issuer_address: issuerAddress,
        mm_address: mmAddress,
        venue,
        pair_symbol: pairSymbol,
        kpi_config_hash: kpiConfigHash,
        spread_max_bps: Number(spreadMaxBps),
        depth_min_usd: Number(depthMinUsd),
        uptime_min_bps: Number(uptimeMinBps),
        manipulation_max_bps: Number(manipulationMaxBps),
        weight_spread_bps: WEIGHT_DEFAULTS.spread,
        weight_depth_bps: WEIGHT_DEFAULTS.depth,
        weight_uptime_bps: WEIGHT_DEFAULTS.uptime,
        weight_manipulation_bps: WEIGHT_DEFAULTS.manipulation,
        start_date: new Date(startDate).toISOString(),
        end_date: new Date(endDate).toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create engagement');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Issuer Address *"
          placeholder="0x…"
          value={issuerAddress}
          onChange={(e) => setIssuerAddress(e.target.value)}
        />
        <Input
          label="MM Address *"
          placeholder="0x…"
          value={mmAddress}
          onChange={(e) => setMmAddress(e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Venue *" placeholder="coinbase" value={venue} onChange={(e) => setVenue(e.target.value)} />
        <Input
          label="Pair Symbol *"
          placeholder="TOKEN-USD"
          value={pairSymbol}
          onChange={(e) => setPairSymbol(e.target.value)}
        />
      </div>
      <Input
        label="KPI Config Hash *"
        placeholder="0x… or ipfs://…"
        value={kpiConfigHash}
        onChange={(e) => setKpiConfigHash(e.target.value)}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          label="Max Spread (bps)"
          type="number"
          value={spreadMaxBps}
          onChange={(e) => setSpreadMaxBps(e.target.value)}
        />
        <Input
          label="Min Depth ($ at ±1%)"
          type="number"
          value={depthMinUsd}
          onChange={(e) => setDepthMinUsd(e.target.value)}
        />
        <Input
          label="Min Uptime (bps)"
          type="number"
          value={uptimeMinBps}
          onChange={(e) => setUptimeMinBps(e.target.value)}
        />
        <Input
          label="Max Manipulation (bps)"
          type="number"
          value={manipulationMaxBps}
          onChange={(e) => setManipulationMaxBps(e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Start Date *"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input label="End Date *" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <p className="text-xs text-[var(--text-muted)]">
        KPI weights default to 35/35/15/15 (spread/depth/uptime/manipulation) summing to 10000 bps.
      </p>
      {error && <p className="text-sm text-[var(--status-error)]">{error}</p>}
      <div className="flex justify-end">
        <Button type="submit" loading={submitting}>
          Create Engagement
        </Button>
      </div>
    </form>
  );
}
