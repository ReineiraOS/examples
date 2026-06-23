# Payment agents (demo)

`@x402-insured-settlement/demo` — a Next.js dashboard for the x402 + RSS
insured-settlement flow, with autonomous buyer and seller agents settling
real on-chain payments on Arbitrum Sepolia. Built on the published
`@reineira-os/x402-*` packages.

## What it is

A "Payment agents" dashboard with a passkey-secured treasury and two
autonomous AI agents — a buyer that pays for resources and a seller that
serves them behind an x402 paywall. Payments settle on-chain via our own
x402 → escrow rail, with optional insurance coverage and claims. A
"Settlement Theater" terminal surfaces each step as it happens.

Sidebar navigation:

| Route        | Page         | Shows                                                              |
| ------------ | ------------ | ------------------------------------------------------------------ |
| `/`          | Agents       | Buyer + seller agents, treasury, the Settlement Theater terminal   |
| `/analytics` | Analytics    | Charts over settlement activity                                    |
| `/plugins`   | Plugins      | RSS resolver / policy plugins wired into the escrow                |
| `/resources` | Resources    | The paid-resource catalog the buyer can purchase                   |
| `/two-key`   | Two-Key Halt | A security primitive on x402 rails (Sentinel / Guardian / verdict) |

## Run

The demo needs a facilitator running (it does `/verify` + `/settle`) and a
`.env.local` in this directory with the Arbitrum Sepolia + agent keys — copy
`.env.example` and fill it in.

Start the facilitator (`../facilitator-web`, or any deployment of
`@reineira-os/x402-facilitator`), then from the solution root:

```bash
pnpm --filter @x402-insured-settlement/demo dev
```

Or from this directory:

```bash
pnpm dev          # next dev on http://localhost:3000
pnpm build        # next build
pnpm typecheck    # tsc --noEmit
```

## Routes

- `GET /api/resource` — the x402 resource server.
  - No `payment-signature` header → `402` with an x402 `payment-required`
    body (version 2, scheme `exact`, network `eip155:421614`, USDC asset
    from `@reineira-os/x402-shared`).
  - With `payment-signature` header → validates the escrow, runs real
    facilitator `/verify` + `/settle`, then returns a **live on-chain data
    report** (`lib/resources.ts`): current Arbitrum Sepolia block + gas plus
    ETH/USD spot, fetched fresh at request time. Nothing is hardcoded.
