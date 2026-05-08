---
title: Liquidity Accord
slug: liquidity-accord
description: Confidential performance bonds for market-makers and delisting insurance for token issuers, built on ReineiraOS (Arbitrum + Fhenix CoFHE).
framework: monorepo
type: defi-protocol
tags: [defi, fhe, fhenix, cofhe, arbitrum, performance-bond, insurance, market-maker, zktls, erc4337]
demoUrl: null
image: null
author: NextGen Financial Analytics
dateAdded: 2026-05-07
repoPath: solutions/liquidity-accord
---

# Liquidity Accord

[![Platform](https://img.shields.io/badge/ReineiraOS-v0.1-blue)](https://reineira.xyz)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Confidential performance bonds for market-makers and delisting insurance for token issuers — NGFA's risk models, productized on ReineiraOS.

> **Owner:** NextGen Financial Analytics (ngfa.eu). ReineiraOS provides settlement infrastructure and scoped build advisory.

## What it does

- **Performance escrow** — token issuers fund monthly MM retainers into FHE-encrypted escrows
- **KPI-scored release** — tranches release only when time-weighted spread / depth / uptime / manipulation targets are hit
- **zkTLS attestations** — Coordinator quorum posts exchange-API snapshots via Reclaim Protocol
- **Delisting insurance** — LP-backed parametric cover, FHE-encrypted premium, UMA OOv3 dispute
- **Certified MM registry** — verifiable on-chain performance history per market-maker

## Packages

| Package            | Stack                                                   | Purpose                                                |
| ------------------ | ------------------------------------------------------- | ------------------------------------------------------ |
| `packages/backend` | TypeScript, Clean Architecture, Vercel-ready            | KPI aggregator, engagements, attestations, MM registry |
| `packages/app`     | React 19 + Vite + Zustand + TanStack + ZeroDev passkeys | Issuer / MM / NGFA-admin dashboards                    |

Custom smart contracts (`LiquidityAccordResolver`, `DelistingInsurancePolicy`, `MMRegistry`) live in `../reineira-code/contracts/`.

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev:backend          # Backend dev server
pnpm dev:app              # Platform app on :4831
pnpm build                # Build everything
pnpm test                 # Run all tests
```

## Phase plan

- **May 2026** — testnet MVP (resolver + policy + issuer dashboard)
- **Jun 2026** — audit (Spearbit / Trail of Bits short form)
- **Jul 2026** — mainnet, 3 pilot engagements
- **Sep 2026** — public launch, first insurance cohort
- **Q1 2027** — 25 certified MMs, public NGFA Liquidity Accord Index

## License

MIT.
