# Roadmap — Liquidity Accord

## Current Phase: Idea → Testnet MVP (target May 2026)

## Priorities (from brief §7)

1. **Ship `LiquidityAccordResolver` + `DelistingInsurancePolicy` to Arbitrum Sepolia.** NGFA authors KPI thresholds (spread, depth, uptime, manipulation) + scoring in Python; ReineiraOS advisory codifies in Solidity under NGFA review. Target: end-to-end redeem within 10 working days.
2. **Wire exchange-API KPI aggregator via Reclaim.** Start with 1 venue (Coinbase) + 1 pair (TBD from NGFA backlog). Daily zkTLS snapshots → on-chain attestation queue → monthly resolver score.
3. **Close 3 pilot engagements from NGFA's backlog on testnet** with non-binding performance commitments. Purpose: validate UX, KPI config UX, dispute edge cases. Beach-head for later fundraise.

## Phase Plan

### Phase 0 — Build (Apr–May 2026)

- Design review: resolver + policy + registry (ReineiraOS advisory)
- `LiquidityAccordResolver.sol` unit tests — Coordinator quorum, window finalize, partial-performance math, replay protection
- `DelistingInsurancePolicy.sol` unit tests — FHE premium path, UMA judge path, venue-risk update
- `MMRegistry.sol` authoring + tests
- Deploy script + `deployments/arbitrumSepolia.json`
- Backend KPI aggregator (Coinbase adapter) + Coordinator signature service
- Frontend: issuer draft-engagement + KPI-config UX, MM view, NGFA-admin attestation queue

### Phase 1 — Testnet MVP (May 2026)

- 3 pilot engagements live on Arbitrum Sepolia with NGFA backlog issuers
- 1 venue (Coinbase), 1 pair, daily snapshots
- End-to-end redeem flow (full / partial / refund tranches)
- NGFA admin dashboard for attestation quorum

### Phase 2 — Audit + Mainnet (Jun–Jul 2026)

- Audit kicks off (Spearbit or Trail of Bits short form) — NGFA-funded
- Address all critical / high findings
- Mainnet deploy with capped $5M retainers across 10 issuers × 3 MMs
- USDC primary; EURC added for EU issuers

### Phase 3 — Public Launch + Insurance (Aug–Sep 2026)

- First institutional LP placement ($5–10M) seeds delisting insurance pool
- First insurance cohort — 5–10 policies written
- Venues expanded to ≥3 exchanges
- Public NGFA Liquidity Accord Index (monthly benchmark of certified MMs)

### Phase 4 — Scale (Oct 2026 – Q1 2027)

- Open certification program → 25 certified MMs
- 60 active engagements
- Cross-venue via CCTP v2
- API / white-label for exchange co-marketing

## Go / No-Go Gates

| Gate        | Criteria                                                               | Status      |
| ----------- | ---------------------------------------------------------------------- | ----------- |
| Phase 0 → 1 | Resolver + policy pass full test suite; audit scoped                   | Not started |
| Phase 1 → 2 | 3 pilots redeemed end-to-end on testnet; < 3% dispute rate; audit pass | Not started |
| Phase 2 → 3 | Mainnet stable 30 days; $5M+ bonded retainer GMV; no critical bugs     | Not started |
| Phase 3 → 4 | $5M LP seeded; 5+ policies written; first payout event handled cleanly | Not started |
