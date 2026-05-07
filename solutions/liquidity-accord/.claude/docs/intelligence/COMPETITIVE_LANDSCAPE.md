# Competitive Landscape — Liquidity Accord

## Direct Competitors

| Competitor                         | What They Do                                               | Weakness                                                               | Our Advantage                                                   |
| ---------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------- |
| Offline MM contracts (status quo)  | Paper NDAs, monthly reports, self-attested volume          | No objective verification, 30–90d settle, wash-trading undetectable    | Time-weighted on-chain KPI score with Coordinator quorum        |
| Wintermute, GSR, B2C2 dashboards   | Internal MM-controlled performance reports                 | MM reports on itself — issuer has no audit ring                        | Neutral third-party (NGFA + Coordinators) scores both sides     |
| Kaiko / CoinAPI analytics          | Exchange-API data + liquidity analytics dashboards         | Pure data — doesn't settle or bond performance                         | Directly gates escrow release, with confidentiality preserved   |
| Nexus Mutual (smart-contract cover) | Parametric DeFi coverage                                   | No delisting-specific product; no issuer/MM performance layer          | Purpose-built for delisting; NGFA risk model for pricing        |
| Chaos Labs / Gauntlet risk advisory | Risk consulting, parameter tuning                          | Advisory only — no on-chain product                                    | Same-domain expertise plus a settled product                    |

## Indirect Competitors / Workarounds

- **Issuers doing nothing** — just writing MM retainers off as opex and hoping reports aren't fabricated. This is the primary "competitor" — inertia.
- **Exchange-internal MM tiers** — some venues run their own MM-scoring programs. They do not publish the method and are venue-specific; Liquidity Accord is cross-venue and open-methodology (within FHE constraints).
- **DAO-voted MM budgets with post-hoc audit** — addresses visibility but not accountability or speed.

## FHE Advantage

| Feature                                   | Liquidity Accord | Offline MM contract | Pure-DeFi analytics |
| ----------------------------------------- | ---------------- | ------------------- | ------------------- |
| Confidential retainer amount              | Yes              | Yes (by NDA)        | No                  |
| Verifiable KPI score                      | Yes              | No                  | Partial (no bond)   |
| Auditable by issuer + MM + NGFA only      | Yes              | Yes                 | No (public)         |
| Tranche-release settlement                | Yes              | Manual              | No                  |
| Parametric delisting cover                | Yes              | No                  | Fragmented          |
| Cross-venue via CCTP v2                   | Yes              | No                  | Partial             |

## Positioning

> **NGFA's consulting practice, productized:** the objective liquidity health signal exchanges already demand, delivered as a confidential on-chain bond between issuer and MM, with a delisting hedge attached — all settled without revealing retainer amounts or risk scores to competitors.

## Threats to Watch

1. **An incumbent MM builds the same tool privately** — unlikely (misaligned incentive: MMs don't want to be scored), but possible. Mitigation: NGFA's dataset + neutrality is the moat.
2. **An exchange launches a similar program** — specific to their venue, hurts only their issuers. Mitigation: Liquidity Accord is cross-venue and venue-neutral.
3. **MiCA CASP classification widens faster than expected** — could force full insurance-licensure path. Mitigation: parametric structure + Cayman/BVI fallback per non-EU issuers.
4. **UMA mis-resolves a delisting event** — catastrophic reputational risk on the insurance leg. Mitigation: three-day bond window + Coordinator-authored fallback appeal procedure.
5. **Fhenix CoFHE availability / cost regression** — any L2 FHE gas step-change would push retainer tranche cost above issuer willingness-to-pay. Mitigation: tranche-level batching, monthly finalize (not per-window).
