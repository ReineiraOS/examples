# Protocol Integration — Liquidity Accord

## Primitives Used

| Primitive                            | Used | Purpose                                                   |
| ------------------------------------ | ---- | --------------------------------------------------------- |
| ConfidentialEscrow                   | Yes  | Retainer custody — monthly MM tranche, FHE-encrypted      |
| LiquidityAccordResolver (custom)     | Yes  | KPI-scored release — in `reineira-code/contracts/resolvers/` |
| ConfidentialCoverageManager          | Yes  | Delisting insurance coverage lifecycle                    |
| DelistingInsurancePolicy (custom)    | Yes  | FHE premium + UMA judge — in `reineira-code/contracts/policies/` |
| PoolFactory                          | Yes  | LP-backed pool for delisting coverage                     |
| MMRegistry (custom, TBD)             | Yes  | NGFA-certified MM directory on-chain                      |
| TrustedForwarder (ERC-2771)          | Yes  | Gasless issuer / MM UX                                    |
| Reclaim Verifier                     | Yes  | zkTLS proof of exchange-API KPI snapshots                 |
| UMA Optimistic Oracle V3             | Yes  | Delisting event dispute resolution                        |
| Chainlink feeds                      | Yes  | Token price for risk scoring                              |
| CCTP v2                              | Yes (Phase 4) | Multi-venue settlement                           |

## Contract Addresses

**Do not hardcode.** Query from ReineiraOS MCP server or `reineira.xyz/docs/reference/contracts`. For Liquidity Accord's custom contracts, read `../reineira-code/deployments/arbitrumSepolia.json` (when deployed).

Existing contracts already in `reineira-code/contracts/`:

- `resolvers/LiquidityAccordResolver.sol` — KPI-scored tranche release
- `policies/DelistingInsurancePolicy.sol` — parametric delisting cover
- `resolvers/TimeLockResolver.sol`, `policies/SimpleUnderwriterPolicy.sol` — reference templates

Still to author: `MMRegistry.sol`, full unit tests for both custom contracts, deploy script.

## Protocol Flow — Performance Bond

```
1. Issuer drafts engagement with MM (off-chain: venue, pair, KPI config)
2. Both sign KPI config (NGFA-authored defaults for the pair type)
3. Issuer funds first-month retainer:
     frontend encrypts amount via cofhejs
     ConfidentialEscrow.create(resolver=LiquidityAccordResolver, resolverData, encAmount)
     → resolver.onConditionSet(escrowId, engagementId) fires
4. MM works the book on designated exchange
5. Coordinators (NGFA + partners, ≥3) fetch daily exchange-API snapshot:
     Reclaim zkTLS proof → backend aggregator → on-chain attestation queue
6. End of month: resolver.finalize(engagementId) computes weighted score in FHE
     spread (w1) + depth (w2) + uptime (w3) + (10000 - manipulation) (w4) → score
     w1 + w2 + w3 + w4 = 10000 bps
7. resolver.isConditionMet(escrowId) returns per-tranche release proportion
8. ConfidentialEscrow.redeem(escrowId) releases proportionally (full / partial / refund)
9. Optional: DelistingInsurancePolicy pays out if pair delisted from venue within window
```

## Protocol Flow — Delisting Cover

```
1. Issuer requests coverage (plaintext: market cap, 30d volume, venue tier, window, UMA query id)
2. DelistingInsurancePolicy.evaluateRisk → FHE-encrypted premium (euint64)
3. Issuer funds coverage via ConfidentialCoverageManager (FHE-encrypted payment)
4. Pool reserves locked per policy terms
5. On delisting event:
     issuer files claim → UMA OOv3 query opens
     UMA resolves (3 day default bond window)
     DelistingInsurancePolicy.judge(coverageId, proof) returns ebool
     if true → payout released from pool
```

## Resolver Design — LiquidityAccordResolver

- **Name:** `LiquidityAccordResolver`
- **Type:** KPI-score + Coordinator quorum
- **Condition:** weighted time-average of spread / depth / uptime / manipulation ≥ threshold
- **Storage (config struct):** venue (bytes32), pair (bytes32), window (uint32 seconds), spreadMaxBps, depthMinUsd, uptimeMinBps, manipulationMaxBps, w1–w4 (uint16, sum = 10000)
- **Reentrancy:** view-only `isConditionMet`, mutation confined to `onConditionSet` + `submitKPI` + `finalize`
- **Replay protection:** `(engagementId, windowStart)` tuple uniqueness
- **Gas target:** < 50k for `isConditionMet`
- **Coordinator quorum:** ≥ 3 signatures per window (configurable at resolver deploy)

## Policy Design — DelistingInsurancePolicy

- **Name:** `DelistingInsurancePolicy`
- **Type:** parametric, UMA-resolved
- **Risk inputs (plaintext):** market cap, 30d volume, venue tier, coverage window, UMA query id
- **Risk score → premium:** FHE function `evaluateRisk → euint64` (premium in basis points of coverage amount)
- **Judge:** reads `UMA_OO_V3.getAssertionResult(queryId)` → encrypted ebool
- **Venue multipliers:** owner-settable `mapping(bytes32 => uint16)` (e.g. Coinbase=100, BitMart=300)
- **FHE pattern (MUST follow):** `FHE.asEuint64 → FHE.allowThis → FHE.allow(caller)`

## SDK Integration

```typescript
import { ReineiraSDK } from '@reineira-os/sdk';

const sdk = ReineiraSDK.create({ network: 'testnet', privateKey: process.env.PRIVATE_KEY });
await sdk.initialize();

// Create retainer escrow
const escrow = await sdk.escrow
  .build()
  .amount(sdk.stablecoin(50_000))                // 50K USDC retainer tranche
  .owner(mmWalletAddress)
  .condition(liquidityAccordResolverAddress, encodedEngagementId)
  .create();

// Submit KPI attestation (from Coordinator)
await sdk.raw.write(liquidityAccordResolverAddress, 'submitKPI', [
  engagementId,
  windowStart,
  kpiSnapshotHash,
  coordinatorSignatures,
]);

// Finalize window (anyone can call after window end)
await sdk.raw.write(liquidityAccordResolverAddress, 'finalize', [engagementId, windowStart]);
```

## Testing

```bash
# In reineira-code
npm install --legacy-peer-deps
npx hardhat test test/resolvers/LiquidityAccordResolver.test.ts
npx hardhat test test/policies/DelistingInsurancePolicy.test.ts
```

Coverage to achieve before audit:

- Coordinator quorum (missing sig, duplicate sig, reorg replay)
- Window boundaries (pre-start submission, post-end submission, mid-window finalize)
- Partial performance math (every weight permutation sums to 10000)
- FHE permission chain (asEuint64 → allowThis → allow(caller))
- UMA timeout path (no resolution → neither pay nor refund, coverage lapses per config)
- Venue-multiplier update as owner vs non-owner
