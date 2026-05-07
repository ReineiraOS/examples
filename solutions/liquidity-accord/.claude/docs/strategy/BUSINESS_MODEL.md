# Business Model — Liquidity Accord

## Revenue Streams

| Stream                              | Fee / Price          | Payer         | Margin           | Status      |
| ----------------------------------- | -------------------- | ------------- | ---------------- | ----------- |
| Escrow release fee                  | 15–30 bps / tranche  | Issuer        | ~95%             | Not started |
| Insurance premium                   | 1–5% of coverage     | Issuer        | 70–85% (net LP)  | Not started |
| LP management fee                   | 0.5% AUM / year      | Pool LPs      | ~95%             | Not started |
| NGFA MM certification subscription  | $5K–$20K / MM / yr   | Market-maker  | ~90%             | Not started |
| Issuer dashboard SaaS               | $2K–$10K / month     | Token treasury| ~92%             | Not started |
| Exchange-API data integration       | $0.50–$2 / pair / mo | Issuer        | ~80%             | Not started |

## Pricing Anchor

A token issuer spending **$200K/month** on MM retainers pays Liquidity Accord roughly **$350–$600/month** in protocol fees + optional **1–3% premium** on a $2M delisting cover ($20K–$60K). Issuer breakeven = one prevented wash-trading round.

## Key Assumptions

1. **Issuers will pay for accountability.** NGFA's existing consulting book (12-month engagements, 7.6× ROI, 45% spread improvement on 300+ pairs) is the proof. The business is currently capped by consultant bandwidth.
2. **FHE confidentiality closes the last objection.** Retainer amounts and premium prices are seen as competitive intel — Fhenix CoFHE makes them unobservable while still auditable.
3. **MiCA (H2 2026) accelerates adoption.** Disclosure rules make the old offline MM-contract model harder to sustain, pushing issuers toward auditable on-chain alternatives.
4. **LP yield is real.** Delisting events ≈ 30–100/yr on top-20 venues, avg –55% 30d drawdown. Pool LPs earn ~18–28% net premium yield at launch pricing.

## Unit Economics Targets

| Metric         | Target                                  | Current |
| -------------- | --------------------------------------- | ------- |
| CAC            | < $5K per issuer (NGFA warm list first) | —       |
| LTV            | > $50K / issuer / yr (fees + SaaS)      | —       |
| LTV:CAC        | > 10:1                                  | —       |
| Gross margin   | > 80% blended                           | —       |
| Payback period | < 4 months                              | —       |
| Dispute rate   | < 3% (protocol settles 97%+ via score)  | —       |

## Risks

1. **Regulatory (EU / MiCA)** — insurance leg may trigger CASP classification. Mitigated by parametric product structure. Non-EU issuers structured via Cayman / BVI for delisting cover.
2. **Market — MM resistance.** Bonding requires counterparty sign-off. Mitigation: NGFA-Certified tier is a discovery advantage MMs want; tier-1 MMs lose nothing by joining when issuers begin requiring on-chain proof.
3. **Technical — KPI oracle robustness.** Exchange APIs change; zkTLS proofs break. Mitigation: Coordinator quorum (≥3), CoinAPI/Kaiko as fallback, UMA OOv3 for disputes.
4. **Pool seed liquidity.** Delisting coverage needs ~$2–5M initial LP to be credible. Mitigation: NGFA-led placement to institutional LPs who understand the risk model.

## 5-Year Arc

| Year | Milestone                                               | Bonded GMV target |
| ---- | ------------------------------------------------------- | ----------------- |
| 1    | Testnet → mainnet → 25 certified MMs, 60 engagements    | $50M              |
| 2    | Cross-venue (top-5 exchanges), first $10M LP seed       | $250M             |
| 3    | Insurance pool TVL > $50M, NGFA Liquidity Accord Index  | $1B               |
