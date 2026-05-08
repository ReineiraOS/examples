# Compliance Framework — Liquidity Accord

## Applicable Regulations

| Regulation          | Applies?    | Status      | Notes                                                                                                  |
| ------------------- | ----------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| MiCA (EU)           | Yes         | Not started | Insurance leg may trigger CASP. Structure as parametric product — not traditional insurance licensing. |
| AML / KYC           | Yes (light) | Not started | Counterparty KYB on MM side; issuer KYB via Circle / Fireblocks-assisted flow                          |
| GDPR                | Yes         | Not started | Issuer + MM contact data + admin-user data stored in backend                                           |
| Travel Rule         | Possibly    | Not started | Triggers on transfers > $1K to unhosted wallets — applicable only on fiat-leg, not escrow-leg          |
| Non-EU / parametric | Yes         | Not started | Cayman / BVI structuring for delisting cover to non-EU issuers                                         |

## MiCA Checklist

- [ ] Obtain counsel memo on CASP classification for the parametric cover
- [ ] Confirm no whitepaper requirement (no token planned)
- [ ] Disclosure template for pool LP subscription agreement
- [ ] Circle / USDC MiCA authorization: confirmed (standing)
- [ ] EURC flow for EU issuers documented under MiCA e-money rules

## AML / KYC Requirements

- [ ] KYB on MM onboarding (corporate registration, beneficial-owner identification)
- [ ] KYB on issuer (foundation docs or token treasury signer identification)
- [ ] Transaction monitoring on pool inflows (watchlist + pattern)
- [ ] SAR filing procedures via counsel-approved template
- [ ] Record retention (≥ 5 years)

## Smart Contract Audit

- [ ] Schedule short-form audit (Spearbit primary, Trail of Bits fallback) — Jun 2026
- [ ] Focus: FHE permission chain, access control on Coordinator quorum, UUPS upgrade safety, UMA integration
- [ ] Address all critical / high findings before mainnet
- [ ] At least one independent firm; NGFA-funded

## Legal Documents to Draft (before mainnet)

- [ ] Terms of Service (issuer-facing)
- [ ] Terms of Service (MM-facing) — includes certification scheme
- [ ] Privacy Policy — GDPR-compliant
- [ ] Risk Disclaimers (DeFi-specific) — retainer loss, pool smart-contract risk, UMA oracle risk
- [ ] Insurance Product Disclosure — parametric cover terms
- [ ] Pool LP Subscription Agreement — rights, lock-up, redemption schedule
- [ ] Coordinator Agreement — NGFA + partner terms, signature responsibility
- [ ] Master Engagement Template — issuer ↔ MM scaffold incorporating KPI config

## Specific Legal Questions to Resolve

1. **Is parametric delisting cover "insurance" under MiCA?** If yes → licensure. If no (parametric = derivative-like) → MiFID disclosures may apply. Counsel memo required before Phase 2.
2. **Is NGFA certification a regulated "rating"?** Some jurisdictions require credit-rating-agency registration for rankings. Likely no (it's performance, not creditworthiness) but memo required.
3. **Coordinator signature liability.** If a Coordinator signs a false KPI snapshot, what is the legal exposure? Resolved via Coordinator Agreement + per-signature cap.
4. **Data-provider license compatibility.** CoinAPI / Kaiko terms must permit redistribution-by-proof (zkTLS). Confirm before integration.
