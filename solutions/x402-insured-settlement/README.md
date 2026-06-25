# x402 Insured Settlement

[![Platform](https://img.shields.io/badge/ReineiraOS-v0.1-blue)](https://reineira.xyz)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Live demo](https://img.shields.io/badge/%E2%96%B6%20live%20demo-x402.reineira.xyz-000000)](https://x402.reineira.xyz)
[![Buildathon](https://img.shields.io/badge/%F0%9F%8F%86%201st%20place-Agentic%20track-FACC15)](https://arbitrum-london.hackquest.io/buildathons/Arbitrum-Open-House-London-Online-Buildathon)

> 🏆 **1st place — Agentic track**, [Arbitrum Open House London Online Buildathon](https://arbitrum-london.hackquest.io/buildathons/Arbitrum-Open-House-London-Online-Buildathon) (2026) — [announcement](https://x.com/arbitrum/status/2069113449221910953).

**▶ Live demo: [x402.reineira.xyz](https://x402.reineira.xyz)**

Autonomous AI agents that pay each other for real resources — settled on-chain
through an x402 → escrow rail with optional insurance coverage and claims. A
buyer agent purchases data behind an x402 paywall; a seller agent serves it; the
payment funds an on-chain escrow on Arbitrum Sepolia and releases on delivery.
Built on the published [`@reineira-os/x402-*`](https://github.com/ReineiraOS/x402)
packages.

## What it does

- **Agentic x402** — a buyer agent and a seller agent transact over the x402
  payment-required protocol, no human in the loop
- **Escrow-gated settlement** — every `402` opens a real on-chain escrow; funds
  release to the seller on delivery, refund the buyer on timeout
- **Optional insurance** — buyers can attach parametric coverage; missed
  delivery files a claim against an underwriter pool
- **Confidential rail (FHE)** — the same flow runs against the Fhenix
  FHE-encrypted escrow stack, hiding amounts on-chain
- **Two-Key Halt** — a Sentinel / Guardian verdict primitive that can freeze a
  rail under attack
- **Settlement Theater** — a live terminal that surfaces every verify / settle /
  release step as it happens

## Packages

| Package                    | Stack                         | Purpose                                                        |
| -------------------------- | ----------------------------- | -------------------------------------------------------------- |
| `packages/demo`            | Next.js 16, React 19, ZeroDev | Payment-agents dashboard, resource server, Settlement Theater  |
| `packages/facilitator-web` | Hono                          | Deployable x402 facilitator (`/verify` + `/settle`) for Vercel |

The on-chain protocol (escrow, receivers, resolvers, FHE codec) ships as the
published `@reineira-os/x402-*` packages — this example consumes them, it does
not vendor their source.

## Setup

```bash
pnpm install
```

Then copy and fill the env files (testnet only — Arbitrum Sepolia):

```bash
cp packages/demo/.env.example packages/demo/.env.local
cp packages/facilitator-web/.env.example packages/facilitator-web/.env.local
```

## Development

```bash
pnpm dev          # demo on http://localhost:3000
pnpm build        # build every package
pnpm typecheck    # tsc --noEmit across packages
```

The demo calls a facilitator for `/verify` + `/settle`. Run `packages/facilitator-web`
(or any deployment of `@reineira-os/x402-facilitator`) and point the demo at it
via `FACILITATOR_URL`.

## License

MIT — see [LICENSE](LICENSE).
