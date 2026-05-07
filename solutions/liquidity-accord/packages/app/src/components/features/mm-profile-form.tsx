import { useState, type FormEvent } from 'react';
import type { CreateMMProfileRequest } from '@/services/MMProfileService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MMProfileFormProps {
  onSubmit: (data: CreateMMProfileRequest) => Promise<void> | void;
}

const TIERS: CreateMMProfileRequest['tier'][] = ['UNCERTIFIED', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM'];

export function MMProfileForm({ onSubmit }: MMProfileFormProps) {
  const [operatorAddress, setOperatorAddress] = useState('');
  const [name, setName] = useState('');
  const [tier, setTier] = useState<CreateMMProfileRequest['tier']>('UNCERTIFIED');
  const [certifiedSince, setCertifiedSince] = useState('');
  const [certificationExpiry, setCertificationExpiry] = useState('');
  const [pairs, setPairs] = useState('');
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!operatorAddress || !name) {
      setError('Operator address and name are required');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        operator_address: operatorAddress,
        name,
        tier,
        certified_since: certifiedSince ? new Date(certifiedSince).toISOString() : undefined,
        certification_expiry: certificationExpiry ? new Date(certificationExpiry).toISOString() : undefined,
        supported_pairs: pairs
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean),
        website: website || undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create MM profile');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Operator Address *"
          placeholder="0x…"
          value={operatorAddress}
          onChange={(e) => setOperatorAddress(e.target.value)}
        />
        <Input
          label="Display Name *"
          placeholder="Acme Liquidity Partners"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--text-primary)]">Tier</label>
          <select
            className="w-full rounded-lg border border-[var(--border-dark)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--text-primary)]"
            value={tier}
            onChange={(e) => setTier(e.target.value as CreateMMProfileRequest['tier'])}
          >
            {TIERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Certified Since"
          type="date"
          value={certifiedSince}
          onChange={(e) => setCertifiedSince(e.target.value)}
        />
        <Input
          label="Certification Expiry"
          type="date"
          value={certificationExpiry}
          onChange={(e) => setCertificationExpiry(e.target.value)}
        />
      </div>
      <Input
        label="Supported Pairs (comma-separated)"
        placeholder="TOKEN-USD, OTHER-USDC"
        value={pairs}
        onChange={(e) => setPairs(e.target.value)}
      />
      <Input
        label="Website"
        placeholder="https://example.com"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      {error && <p className="text-sm text-[var(--status-error)]">{error}</p>}
      <div className="flex justify-end">
        <Button type="submit" loading={submitting}>
          Add MM Profile
        </Button>
      </div>
    </form>
  );
}
