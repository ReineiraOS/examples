import type { EngagementResponse } from '@/services/EngagementService';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface EngagementListProps {
  engagements: EngagementResponse[];
  loading: boolean;
  onSelect?: (engagement: EngagementResponse) => void;
}

function statusVariant(status: string): 'success' | 'warning' | 'error' | 'info' | 'default' {
  const map: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    ACTIVE: 'success',
    COMPLETED: 'success',
    DRAFT: 'info',
    PAUSED: 'warning',
    TERMINATED: 'error',
  };
  return map[status] ?? 'default';
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function truncateAddress(addr: string): string {
  return addr.length > 10 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
}

export function EngagementList({ engagements, loading, onSelect }: EngagementListProps) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border-dark)] text-[var(--text-muted)] uppercase text-xs tracking-wider">
              <th className="pb-3 pr-4 font-medium">Pair</th>
              <th className="pb-3 pr-4 font-medium">Venue</th>
              <th className="pb-3 pr-4 font-medium">Issuer</th>
              <th className="pb-3 pr-4 font-medium">MM</th>
              <th className="pb-3 pr-4 font-medium">Period</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {engagements.map((e) => (
              <tr
                key={e.public_id}
                className="border-b border-[var(--border-dark)] last:border-0 cursor-pointer hover:bg-[var(--background-secondary)] transition-colors"
                onClick={() => onSelect?.(e)}
              >
                <td className="py-3 pr-4 font-medium text-[var(--text-primary)]">{e.pair_symbol}</td>
                <td className="py-3 pr-4 text-[var(--text-secondary)]">{e.venue}</td>
                <td className="py-3 pr-4 font-mono text-xs text-[var(--text-secondary)]">
                  {truncateAddress(e.issuer_address)}
                </td>
                <td className="py-3 pr-4 font-mono text-xs text-[var(--text-secondary)]">
                  {truncateAddress(e.mm_address)}
                </td>
                <td className="py-3 pr-4 text-[var(--text-secondary)]">
                  {formatDate(e.start_date)} → {formatDate(e.end_date)}
                </td>
                <td className="py-3">
                  <Badge variant={statusVariant(e.status)}>{e.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && engagements.length === 0 && (
        <div className="flex flex-col gap-3 py-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      )}

      {!loading && engagements.length === 0 && (
        <p className="py-8 text-center text-sm text-[var(--text-secondary)]">No engagements yet</p>
      )}
    </div>
  );
}
