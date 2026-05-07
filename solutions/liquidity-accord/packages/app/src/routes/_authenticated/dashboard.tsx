import { Link } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import { useEngagementStore } from '@/stores/engagement-store';
import { useAttestationStore } from '@/stores/attestation-store';
import { useMMProfileStore } from '@/stores/mm-profile-store';
import { EngagementList } from '@/components/features/engagement-list';
import { AttestationList } from '@/components/features/attestation-list';
import { MMProfileList } from '@/components/features/mm-profile-list';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function DashboardPage() {
  const engagements = useEngagementStore((s) => s.engagements);
  const engagementLoading = useEngagementStore((s) => s.loading);
  const fetchEngagements = useEngagementStore((s) => s.fetchEngagements);

  const attestations = useAttestationStore((s) => s.attestations);
  const attestationLoading = useAttestationStore((s) => s.loading);
  const fetchAttestations = useAttestationStore((s) => s.fetchAttestations);

  const profiles = useMMProfileStore((s) => s.profiles);
  const profileLoading = useMMProfileStore((s) => s.loading);
  const fetchProfiles = useMMProfileStore((s) => s.fetchProfiles);

  useEffect(() => {
    fetchEngagements();
    fetchAttestations();
    fetchProfiles();
  }, [fetchEngagements, fetchAttestations, fetchProfiles]);

  const activeEngagements = useMemo(
    () => engagements.filter((e) => e.status === 'ACTIVE').length,
    [engagements],
  );
  const pendingAttestations = useMemo(
    () => attestations.filter((a) => a.status === 'PENDING').length,
    [attestations],
  );
  const certifiedMMs = useMemo(
    () => profiles.filter((p) => p.tier !== 'UNCERTIFIED').length,
    [profiles],
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Liquidity Accord</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Confidential performance bonds for market-makers and delisting insurance for token issuers.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/engagements">
          <Card className="hover:border-[var(--accent-blue)]/40 transition-colors cursor-pointer h-full">
            <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Engagements</p>
            <p className="mt-2 text-3xl font-bold text-[var(--text-primary)]">{engagements.length}</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              <Badge variant="success">{activeEngagements} active</Badge>
            </p>
          </Card>
        </Link>
        <Link to="/attestations">
          <Card className="hover:border-[var(--accent-blue)]/40 transition-colors cursor-pointer h-full">
            <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">Attestations</p>
            <p className="mt-2 text-3xl font-bold text-[var(--text-primary)]">{attestations.length}</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              <Badge variant="warning">{pendingAttestations} pending quorum</Badge>
            </p>
          </Card>
        </Link>
        <Link to="/mm-profiles">
          <Card className="hover:border-[var(--accent-blue)]/40 transition-colors cursor-pointer h-full">
            <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">MM Registry</p>
            <p className="mt-2 text-3xl font-bold text-[var(--text-primary)]">{profiles.length}</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              <Badge variant="info">{certifiedMMs} certified</Badge>
            </p>
          </Card>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/engagements">
          <Button>New Engagement</Button>
        </Link>
        <Link to="/attestations">
          <Button variant="secondary">Submit Attestation</Button>
        </Link>
        <Link to="/mm-profiles">
          <Button variant="secondary">Add MM</Button>
        </Link>
      </div>

      <Card title="Recent Engagements">
        <EngagementList engagements={engagements.slice(0, 5)} loading={engagementLoading} />
        {engagements.length > 0 && (
          <div className="mt-4 border-t border-[var(--border-dark)] pt-4">
            <Link
              to="/engagements"
              className="text-sm font-medium text-[var(--accent-blue)] hover:text-[var(--accent-blue-hover)] transition-colors"
            >
              View all engagements →
            </Link>
          </div>
        )}
      </Card>

      <Card title="Recent Attestations">
        <AttestationList attestations={attestations.slice(0, 5)} loading={attestationLoading} />
        {attestations.length > 0 && (
          <div className="mt-4 border-t border-[var(--border-dark)] pt-4">
            <Link
              to="/attestations"
              className="text-sm font-medium text-[var(--accent-blue)] hover:text-[var(--accent-blue-hover)] transition-colors"
            >
              View all attestations →
            </Link>
          </div>
        )}
      </Card>

      <Card title="Top Certified MMs">
        <MMProfileList profiles={profiles.slice(0, 5)} loading={profileLoading} />
        {profiles.length > 0 && (
          <div className="mt-4 border-t border-[var(--border-dark)] pt-4">
            <Link
              to="/mm-profiles"
              className="text-sm font-medium text-[var(--accent-blue)] hover:text-[var(--accent-blue-hover)] transition-colors"
            >
              View MM registry →
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
