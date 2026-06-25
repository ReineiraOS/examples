import type { AttestationResponse } from '@/services/AttestationService';
import { Badge } from '@/components/ui/badge';
import { CopyableId } from '@/components/ui/copyable-id';
import { Skeleton } from '@/components/ui/skeleton';

interface AttestationListProps {
  attestations: AttestationResponse[];
  loading: boolean;
}

function statusVariant(status: string): 'success' | 'warning' | 'error' | 'info' | 'default' {
  const map: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    FINALIZED: 'success',
    QUORUM_REACHED: 'info',
    PENDING: 'warning',
    DISPUTED: 'warning',
    REJECTED: 'error',
  };
  return map[status] ?? 'default';
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function truncate(s: string, max = 10): string {
  return s.length > max ? `${s.slice(0, max)}…` : s;
}

export function AttestationList({ attestations, loading }: AttestationListProps) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border-dark)] text-[var(--text-muted)] uppercase text-xs tracking-wider">
              <th className="pb-3 pr-4 font-medium">ID</th>
              <th className="pb-3 pr-4 font-medium">Engagement</th>
              <th className="pb-3 pr-4 font-medium">Window</th>
              <th className="pb-3 pr-4 font-medium">Spread</th>
              <th className="pb-3 pr-4 font-medium">Depth</th>
              <th className="pb-3 pr-4 font-medium">Uptime</th>
              <th className="pb-3 pr-4 font-medium">Coord Sigs</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {attestations.map((a) => (
              <tr key={a.public_id} className="border-b border-[var(--border-dark)] last:border-0">
                <td className="py-3 pr-4">
                  <CopyableId value={a.public_id} />
                </td>
                <td className="py-3 pr-4">
                  <CopyableId value={a.engagement_public_id} max={14} />
                </td>
                <td className="py-3 pr-4 text-[var(--text-secondary)]">
                  {formatDate(a.window_start)} → {formatDate(a.window_end)}
                </td>
                <td className="py-3 pr-4 text-[var(--text-secondary)]">
                  {a.spread_bps != null ? `${a.spread_bps} bps` : '—'}
                </td>
                <td className="py-3 pr-4 text-[var(--text-secondary)]">
                  {a.depth_usd != null ? `$${a.depth_usd.toLocaleString()}` : '—'}
                </td>
                <td className="py-3 pr-4 text-[var(--text-secondary)]">
                  {a.uptime_bps != null ? `${(a.uptime_bps / 100).toFixed(2)}%` : '—'}
                </td>
                <td className="py-3 pr-4 text-[var(--text-primary)]">{a.coordinator_signatures_count}</td>
                <td className="py-3">
                  <Badge variant={statusVariant(a.status)}>{a.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && attestations.length === 0 && (
        <div className="flex flex-col gap-3 py-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      )}

      {!loading && attestations.length === 0 && (
        <p className="py-8 text-center text-sm text-[var(--text-secondary)]">No attestations yet</p>
      )}
    </div>
  );
}
