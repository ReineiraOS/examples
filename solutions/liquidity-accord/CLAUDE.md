# Liquidity Accord — Confidential MM Performance Bonds

> NGFA's confidential on-chain performance-bond protocol between token issuers and market-makers,
> with an LP-backed delisting insurance layer. Built on ReineiraOS (Arbitrum + Fhenix CoFHE).

## Version

- **Venture version:** 0.1.0
- **Platform version:** 0.1
- **Owner:** NextGen Financial Analytics (ngfa.eu)
- **Stage:** Idea → testnet MVP target May 2026

## One-liner

Confidential performance bonds for market-makers and delisting insurance for token issuers — NGFA's risk models, productized.

## Structure

```
packages/
  backend/       — @liquidity-accord/backend   (KPI aggregator, engagements, attestations, MM registry)
  app/           — @liquidity-accord/app       (issuer / MM / NGFA-admin dashboards)
```

## Core Features

1. **Performance Escrow** — Monthly retainer funded into `ConfidentialEscrow` with FHE-encrypted amount.
2. **LiquidityAccordResolver** — Tranche-release gate scoring spread / depth / uptime / manipulation.
3. **zkTLS KPI attestation** — Reclaim Protocol proofs from exchange APIs, Coordinator quorum.
4. **DelistingInsurancePolicy** — LP-backed parametric cover. FHE premium, UMA OOv3 dispute resolution.
5. **NGFA-Certified MM Registry** — On-chain verifiable MM performance history.

## Protocol Primitives Used

| Primitive                      | Purpose                                               |
| ------------------------------ | ----------------------------------------------------- |
| ConfidentialEscrow             | Retainer custody (FHE-encrypted)                      |
| LiquidityAccordResolver        | KPI-scored tranche release (in `reineira-code`)       |
| ConfidentialCoverageManager    | Delisting insurance coverage                          |
| DelistingInsurancePolicy       | Parametric cover policy (in `reineira-code`)          |
| PoolFactory                    | LP-backed insurance pools                             |
| Reclaim Verifier               | zkTLS proofs of exchange order-book snapshots         |
| UMA Optimistic Oracle V3       | Delisting event dispute resolution                    |
| CCTP v2                        | Multi-venue USDC / EURC settlement                    |

## Verification Sources

| Source          | What It Proves                                  |
| --------------- | ----------------------------------------------- |
| Reclaim zkTLS   | Exchange public order-book + trade-tape data    |
| CoinAPI / Kaiko | Market data feed for aggregator                 |
| UMA Oracle V3   | Delisting event / outcome resolution            |
| Chainlink       | Token prices for risk scoring                   |

## Custom Data Entities (backend)

| Entity      | Purpose                                                     |
| ----------- | ----------------------------------------------------------- |
| Engagement  | Issuer × MM × venue × pair contract (KPI config, dates)     |
| Attestation | Measurement-window KPI snapshot + Coordinator signatures    |
| MMProfile   | NGFA-certified MM directory (tier, perf history, cert exp.) |

Existing protocol entities (Escrow, Coverage) stay as shipped by platform-modules.

## Tech Stack

- **Contracts:** Solidity ^0.8.24 on Arbitrum + Fhenix CoFHE (in `reineira-code`)
- **Frontend:** React 19 + Vite + Zustand + TanStack Router + Tailwind (ZeroDev passkeys, Safe for treasuries)
- **Backend:** TypeScript + Clean Architecture (Vercel-ready, DB-agnostic)
- **Encryption:** Fhenix CoFHE for retainer amounts, premiums, risk scores
- **Settlement:** Stablecoin-agnostic (IFHERC20) — USDC primary, EURC for EU issuers
- **Cross-venue:** Circle CCTP v2

## Ecosystem

| Repo                  | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| **liquidity-accord** (this repo) | App code (frontend + backend)        |
| **reineira-atlas**    | Startup OS — strategy, ops, growth, compliance  |
| **reineira-code**     | Custom resolvers/policies (LiquidityAccordResolver, DelistingInsurancePolicy) |
| **platform-modules**  | Upstream template — pull updates from here      |

## Running Locally

```bash
pnpm install
pnpm dev:backend       # backend on :3000 (or configured port)
pnpm dev:app           # app on :4831
```

## Commit Conventions

Conventional Commits. Scopes: `backend`, `app`, `docs`, `ci`, `build`. Breaking changes in the `!:` shorthand or `BREAKING CHANGE:` footer.

## Agent Roles (see `.claude/agents/`)

| Prefix       | Domain                                          |
| ------------ | ----------------------------------------------- |
| `protocol-*` | Resolver / policy design (LiquidityAccordResolver, DelistingInsurancePolicy) |
| `product-*`  | Frontend + backend development                  |
| `strategy-*` | Business model, pricing, pitch                  |
| `growth-*`   | Community, content, NGFA partnerships           |
| `legal-*`    | MiCA, AML/KYC, parametric insurance structuring |
| `core-*`     | Orchestration, sprint planning                  |
