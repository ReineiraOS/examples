# Metrics Dashboard — Liquidity Accord

## Current Phase: Idea → Testnet MVP (target May 2026)

## Protocol Metrics

| Metric                               | Current | 12-month Target | Status      |
| ------------------------------------ | ------- | --------------- | ----------- |
| Bonded retainer volume (GMV)         | $0      | $50M            | Not started |
| Active engagements (issuer × MM)     | 0       | 60              | Not started |
| Delisting coverage purchased (notional) | $0   | $30M            | Not started |
| NGFA-certified MMs                   | 0       | 25              | Not started |
| Completion rate (tranche released)   | —       | > 95%           | Not started |
| Dispute rate                         | —       | < 3%            | Not started |
| Avg monthly retainer                 | —       | $100K–$250K     | Not started |

## Business Metrics

| Metric                               | Current | 12-month Target | Status      |
| ------------------------------------ | ------- | --------------- | ----------- |
| Protocol fee revenue                 | $0      | ~$100K          | Not started |
| Insurance premium revenue (net LP)   | $0      | ~$750K          | Not started |
| MM certification subscription revenue| $0      | $250K (25 × $10K) | Not started |
| Issuer SaaS revenue                  | $0      | $300K           | Not started |
| Pool TVL                             | $0      | $10M            | Not started |
| LP net yield (annualized)            | —       | 18–28%          | Not started |

## Growth Metrics

| Metric                           | Current | 12-month Target | Status      |
| -------------------------------- | ------- | --------------- | ----------- |
| Pilot issuers (testnet)          | 0       | 3               | Not started |
| Mainnet issuers (capped $5M)     | 0       | 10 → 30         | Not started |
| Conference meetings booked       | 0       | > 50            | Not started |
| Index publications               | 0       | 4 (Sep 2026+)   | Not started |
| GitHub stars on `reineira-code`  | —       | (secondary)     | Not started |

## Update Schedule

- Weekly review every Monday (owner: core-chief agent → `/weekly-plan`)
- GMV / engagement count updated from backend on-demand
- Insurance metrics updated whenever a policy is written, claimed, or expires
- Metric targets re-baselined at each Go/No-Go gate (see ROADMAP.md)

## Leading Indicators to Watch Early

| Indicator                                   | Why it matters                                     |
| ------------------------------------------- | -------------------------------------------------- |
| Pilot issuers (count)                       | Confirms warm-list distribution works              |
| Dispute rate on pilots                      | Validates KPI config UX + threshold defaults       |
| Coordinator quorum failure rate             | Operational health of attestation layer            |
| zkTLS proof reliability (% windows with valid proof) | Directly gates the whole protocol          |
| Win-rate on issuer sales calls              | Pricing tension signal                             |
