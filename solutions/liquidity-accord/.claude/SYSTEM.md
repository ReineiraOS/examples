# Liquidity Accord — System Configuration

> Master configuration. Loaded FIRST on every Claude Code invocation. Last updated: 2026-04-22

---

## Phase

**PHASE: Idea → Testnet MVP (target May 2026).**

Active priorities:

1. Ship `LiquidityAccordResolver` + `DelistingInsurancePolicy` to Arbitrum Sepolia (end-to-end redeem within 10 working days).
2. Wire exchange-API KPI aggregator via Reclaim (Coinbase + 1 pair).
3. Close 3 pilot engagements from NGFA backlog on testnet.

See `.claude/docs/strategy/ROADMAP.md` and `.claude/docs/execution/ACTION_ITEMS.md`.

---

## 1. Project Identity

**Liquidity Accord.** Confidential performance bonds for market-makers and delisting insurance for token issuers — NGFA's risk models, productized.

- **Owner:** NextGen Financial Analytics (ngfa.eu)
- **Protocol:** ReineiraOS (Arbitrum + Fhenix CoFHE)
- **Settlement:** Stablecoin-agnostic via `IFHERC20` (USDC primary, EURC for EU)
- **Stage:** Idea → Testnet MVP

### The Ecosystem

| Repo                 | Role                                                                               |
| -------------------- | ---------------------------------------------------------------------------------- |
| **liquidity-accord** (here) | App code — backend KPI aggregator, issuer / MM / admin dashboards           |
| **reineira-atlas**   | Startup OS (strategy, ops, growth, pitch) — this Atlas is the template the venture was forked from; the venture's own `.claude/` is here |
| **reineira-code**    | Custom Solidity: `LiquidityAccordResolver`, `DelistingInsurancePolicy`, `MMRegistry` |
| **platform-modules** | Upstream scaffold — pull template updates from here                                |

### Protocol Stack (5 layers)

| Layer          | What It Does                                           | Who Owns It                                             |
| -------------- | ------------------------------------------------------ | ------------------------------------------------------- |
| Application    | Issuer / MM / admin dashboards                         | Liquidity Accord (this repo)                            |
| Plugin         | `LiquidityAccordResolver`, `DelistingInsurancePolicy`, `MMRegistry` | Liquidity Accord (in `reineira-code`)           |
| Protocol       | ConfidentialEscrow, CoverageManager, PoolFactory       | ReineiraOS                                              |
| Infrastructure | Coordinator network (NGFA + partners), CCTP relay      | Liquidity Accord operates Coordinator quorum; CCTP external |
| Settlement     | Arbitrum L2, Fhenix CoFHE, Circle CCTP V2              | External protocols                                      |

### Open Economy Roles — Liquidity Accord plays all four

| Role             | How it shows up here                                  | Revenue                                           |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------- |
| Policy Builder   | NGFA authors `DelistingInsurancePolicy`               | Share of premium revenue                          |
| Pool Underwriter | NGFA-curated pools; later institutional LP            | Net premiums − claims − LP share                  |
| LP Staker        | Institutional LPs (Phase 3+)                          | 18–28% net premium APY target                     |
| Operator         | Coordinator quorum (NGFA + partners) — attestation    | Per-window retainer fee                           |

---

## 2. Architecture

```
liquidity-accord/
├── CLAUDE.md              ← Technical context, protocol reference
├── packages/
│   ├── backend/           ← KPI aggregator, engagements, attestations, MM registry
│   └── app/               ← Issuer / MM / admin dashboards
│
└── .claude/
    ├── SYSTEM.md          ← YOU ARE HERE
    │
    ├── agents/            ← WHO
    │   ├── _dispatch.md
    │   ├── core-chief.md
    │   ├── protocol-resolver.md, protocol-policy.md
    │   ├── product-frontend.md, product-backend.md, product-integrator.md
    │   ├── strategy-advisor.md, strategy-pitch.md, strategy-tokenomics.md
    │   ├── growth-community.md, growth-content.md
    │   └── legal-crypto.md
    │
    ├── docs/              ← WHAT is true
    │   ├── strategy/      ← BUSINESS_MODEL, ROADMAP, TOKENOMICS
    │   ├── product/       ← ARCHITECTURE, PROTOCOL_INTEGRATION
    │   ├── growth/        ← COMMUNITY_STRATEGY
    │   ├── intelligence/  ← METRICS, COMPETITIVE_LANDSCAPE
    │   ├── legal/         ← COMPLIANCE
    │   └── execution/     ← SPRINT_LOG, ACTION_ITEMS
    │
    └── data/              ← append-only
        ├── decisions/
        ├── metrics/
        └── signals/
```

---

## 3. Conventions

### Naming

| Type   | Convention             | Example                      |
| ------ | ---------------------- | ---------------------------- |
| Docs   | SCREAMING_SNAKE.md     | docs/strategy/TOKENOMICS.md  |
| Agents | {domain}-{role}.md     | protocol-resolver.md         |
| Skills | {verb}/{noun}/SKILL.md | build/resolver/SKILL.md      |
| Data   | YYYY-MM-DD.md          | data/decisions/2026-04-22.md |

### Cross-Reference Syntax

| Syntax                     | Resolves To                                          |
| -------------------------- | ---------------------------------------------------- |
| `@doc:TOKENOMICS`          | `.claude/docs/strategy/TOKENOMICS.md`                |
| `@doc:METRICS`             | `.claude/docs/intelligence/METRICS.md`               |
| `@doc:PROTOCOL_INTEGRATION`| `.claude/docs/product/PROTOCOL_INTEGRATION.md`       |
| `@agent:protocol-resolver` | `.claude/agents/protocol-resolver.md`                |
| `@data:decisions`          | `.claude/data/decisions/`                            |

---

## 4. Agent Dispatch

See `agents/_dispatch.md`.

---

## 5. Data Flow Rules

### Before Any Recommendation

1. Check `@doc:METRICS` for current KPI state
2. Reference protocol context (contract addresses in `reineira-code/deployments/*.json` once deployed; MCP otherwise)
3. Verify against current roadmap and decision framework

### After Any Strategic Change

1. Update relevant doc
2. Log to `@data:decisions/YYYY-MM-DD.md`
3. Update `@doc:SPRINT_LOG` if task-related

---

## 6. Current Key Numbers

| Metric           | Value                             | Source          |
| ---------------- | --------------------------------- | --------------- |
| Stage            | Idea → Testnet MVP                | brief.md §1     |
| Testnet target   | May 2026                          | brief.md §6     |
| Mainnet target   | Jul 2026                          | brief.md §6     |
| Budget envelope  | $150–250K (Phase 0–1)             | brief.md §6     |
| Team             | Lance de Hoog (MD) + Alex Smith (CTO) + ReineiraOS advisory | brief.md §5 |
| Protocol         | ReineiraOS on Arbitrum Sepolia    | brief.md §3     |
| Settlement       | Stablecoin-agnostic (IFHERC20)    | Protocol        |
| Wallet (humans)  | ZeroDev (ERC-4337 + passkeys)     | brief.md §3     |
| Wallet (treasuries) | Safe multisig                  | brief.md §6     |
| Encryption       | Fhenix CoFHE                      | Protocol        |
| 12-month GMV     | $50M bonded retainer volume target | brief.md §4    |
| 12-month coverage | $30M notional delisting cover     | brief.md §4     |
| 12-month certified MMs | 25                          | brief.md §4     |

---

## 7. Fund Intro Pipeline

NGFA funds Phase 0–1 (~$150–250K). External raise considered at Phase 2+ for insurance pool seed ($2–5M initial LP).

Readiness criteria:

- [ ] Testnet MVP with 3 pilot engagements redeeming end-to-end
- [ ] Audit pass (Spearbit / Trail of Bits short-form)
- [ ] First mainnet retainer bonded + released
- [ ] Metrics tracking live (@doc:METRICS)
- [ ] Pitch materials prepared via `/pitch-prep` (`@agent:strategy-pitch`)

---

## 8. Platform Versioning

`reineira.json` declares `platform: "0.1"`. Breaking changes in `IConditionResolver` / `IUnderwriterPolicy` interfaces trigger platform version bump. Before advising on contract patterns: verify `reineira.json` platform matches MCP-reported platform; flag if mismatched.
