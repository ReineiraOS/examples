import type { MMProfileResponse } from '@/services/MMProfileService';
import { Badge } from '@/components/ui/badge';
import { CopyableId } from '@/components/ui/copyable-id';
import { Skeleton } from '@/components/ui/skeleton';

interface MMProfileListProps {
  profiles: MMProfileResponse[];
  loading: boolean;
}

function tierVariant(tier: string): 'success' | 'warning' | 'error' | 'info' | 'default' {
  const map: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    PLATINUM: 'success',
    GOLD: 'success',
    SILVER: 'info',
    BRONZE: 'warning',
    UNCERTIFIED: 'default',
  };
  return map[tier] ?? 'default';
}

function truncateAddress(addr: string): string {
  return addr.length > 10 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
}

export function MMProfileList({ profiles, loading }: MMProfileListProps) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border-dark)] text-[var(--text-muted)] uppercase text-xs tracking-wider">
              <th className="pb-3 pr-4 font-medium">ID</th>
              <th className="pb-3 pr-4 font-medium">Name</th>
              <th className="pb-3 pr-4 font-medium">Operator</th>
              <th className="pb-3 pr-4 font-medium">Tier</th>
              <th className="pb-3 pr-4 font-medium">Pairs</th>
              <th className="pb-3 pr-4 font-medium">Engagements</th>
              <th className="pb-3 font-medium">Cert Expires</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((p) => (
              <tr key={p.public_id} className="border-b border-[var(--border-dark)] last:border-0">
                <td className="py-3 pr-4">
                  <CopyableId value={p.public_id} />
                </td>
                <td className="py-3 pr-4 font-medium text-[var(--text-primary)]">{p.name}</td>
                <td className="py-3 pr-4 font-mono text-xs text-[var(--text-secondary)]">
                  {truncateAddress(p.operator_address)}
                </td>
                <td className="py-3 pr-4">
                  <Badge variant={tierVariant(p.tier)}>{p.tier}</Badge>
                </td>
                <td className="py-3 pr-4 text-[var(--text-secondary)]">{p.supported_pairs.length}</td>
                <td className="py-3 pr-4 text-[var(--text-primary)]">{p.cumulative_engagements}</td>
                <td className="py-3 text-[var(--text-secondary)]">
                  {p.certification_expiry
                    ? new Date(p.certification_expiry).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && profiles.length === 0 && (
        <div className="flex flex-col gap-3 py-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      )}

      {!loading && profiles.length === 0 && (
        <p className="py-8 text-center text-sm text-[var(--text-secondary)]">No certified MMs yet</p>
      )}
    </div>
  );
}
