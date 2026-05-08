# Tokenomics & Incentive Design — Liquidity Accord

## Open Economy Roles Played

Liquidity Accord plays **all four** ReineiraOS roles at different points in the stack.

| Role             | Who plays it in Liquidity Accord                     | Revenue Mechanism                                      |
| ---------------- | ---------------------------------------------------- | ------------------------------------------------------ |
| Policy Builder   | NGFA (authors `DelistingInsurancePolicy`)            | Protocol share of premium revenue                      |
| Pool Underwriter | NGFA-curated pools; later institutional LP           | Net premiums − claims − LP share                       |
| LP Staker        | Institutional LPs (Phase 3+), later DAO treasuries   | Proportional share of net premiums (target 18–28% APY) |
| Operator         | Coordinator quorum (NGFA + partners) for attestation | Retainer + per-window fee (off-protocol, paid in USDC) |

## Flywheel

```
NGFA 300-pair dataset → sharper KPI thresholds + risk model
    ↓
More issuers choose NGFA-Certified MMs
    ↓
More engagements bonded → more escrow GMV + more optional coverage
    ↓
More premium flows → LPs earn yield → pool capacity grows
    ↓
Bigger coverage limits attract larger issuers
    ↓
More data → better model → (loop)
```

The data moat is the defensible differentiator: NGFA's 300-pair performance history is the training set that prices risk better than any pure-DeFi competitor.

## Fee Structure

| Fee                           | Rate                | Who Pays       | Who Earns                              |
| ----------------------------- | ------------------- | -------------- | -------------------------------------- |
| Escrow release                | 15–30 bps / tranche | Issuer         | Liquidity Accord (NGFA) + ReineiraOS   |
| Insurance premium             | 1–5% of coverage    | Issuer         | LP share + Liquidity Accord + Reineira |
| LP management                 | 0.5% AUM / year     | Pool LP        | Liquidity Accord (pool operator)       |
| MM certification subscription | $5K–$20K / yr / MM  | Market-maker   | Liquidity Accord (off-protocol)        |
| Issuer dashboard SaaS         | $2K–$10K / month    | Token treasury | Liquidity Accord (off-protocol)        |

ReineiraOS protocol-level fees apply identically to every builder — no preferential take for NGFA.

## Sustainability Analysis

- **Break-even:** approximately $8M/month bonded GMV at 20 bps average release fee covers Liquidity Accord base opex (team + infra + audits + data licenses). Year-1 $50M GMV target → ~$100K protocol-fee revenue alone. Crosses break-even only with SaaS + cert layers, hence the stack.
- **Subsidy-free:** Yes — the flywheel does not require a token. NGFA's economics work purely on premium + fee capture because underwriting is priced conservatively against the 300-pair loss distribution.
- **Claim-coverage risk:** Parametric structure pays out against UMA-verified delisting events only; no discretion. Pool capped at LP-declared capacity; over-subscription triggers pause, not default. Catastrophic-scenario stress test: simultaneous top-5 venue delistings → ~$25M payout, requiring pool of at least that size by Phase 3.

## Token Design

**Liquidity Accord will not launch a token.** Reasons:

- Revenue accrues directly to NGFA / LPs — no coordination incentive needed
- Governance is NGFA-led; risk model is NGFA IP, not collective-governed
- Token adds regulatory surface (MiCA) with zero functional upside

Revisit only if / when DAO structure becomes strategically necessary (e.g., Phase 4+ decentralized Coordinator network).
