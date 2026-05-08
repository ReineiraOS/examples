import { lorem, imagePlaceholder } from '@/lib/lorem'

export interface ImageSlot {
  src: string | null
  alt: string
  description: string
  width?: number
  height?: number
}

export interface CtaSlot {
  label: string
  href: string
  external?: boolean
}

export interface NavItem {
  label: string
  href?: string
  items?: Array<{ label: string; description?: string; href: string; icon?: string; external?: boolean }>
}

export interface FooterGroup {
  title: string
  links: Array<{ label: string; href: string; external?: boolean; badge?: string }>
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface HeroSlot {
  eyebrow?: string | null
  title: string
  subtitle: string
  primaryCta: CtaSlot
  secondaryCta?: CtaSlot | null
}

export interface StatsSlot {
  eyebrow?: string | null
  title?: string | null
  items: Array<{ value: string; label: string }>
}

export interface CardsSlot {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  items: Array<{
    id: string
    icon?: string
    title: string
    description: string
    href?: string
    image?: ImageSlot | null
    badge?: string
  }>
}

export interface LogoStripSlot {
  title?: string | null
  logos: Array<{ name: string; src?: string | null }>
}

export interface BulletsSlot {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  items: Array<{ icon?: string; title: string; description: string }>
}

export interface ProseSlot {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  paragraphs: string[]
  image?: ImageSlot | null
  bullets?: Array<{ title: string; description?: string }> | null
}

export interface FaqSlot {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  items: Array<{ question: string; answer: string }>
}

export interface CtaBlockSlot {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  primaryCta: CtaSlot
  secondaryCta?: CtaSlot | null
}

export interface PricingPlanSlot {
  name: string
  price: string
  period?: string | null
  description?: string | null
  features: string[]
  cta: CtaSlot
  featured?: boolean
}

export interface PricingSlot {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  plans: PricingPlanSlot[]
}

export interface StepsSlot {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  steps: Array<{ number: string; title: string; description: string }>
}

export interface PostCardSlot {
  slug: string
  category: string
  title: string
  description: string
  date: string
  readTime: string
  author: string
  image?: ImageSlot | null
}

export interface BlogGridSlot {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  posts: PostCardSlot[]
}

export interface DepartmentSlot {
  label: string
  email: string
  description: string
  icon: string
}

export interface LegalSlot {
  eyebrow: string
  title: string
  effectiveDate?: string | null
  markdown: string
}

export interface SiteConfig {
  meta: {
    brandName: string
    tagline: string
    description: string
    siteUrl: string
    email: {
      support: string
      sales: string
      media: string
      dev: string
    }
    social: SocialLink[]
    appUrl: string
    githubUrl?: string | null
    docsUrl?: string | null
    keywords: string[]
    twitterHandle?: string | null
  }
  branding: {
    accent: string
    fontSans?: string | null
    fontMono?: string | null
    borderRadius?: { button?: string; block?: string; xl?: string } | null
    borderWidth?: string | null
    faviconInitial?: string | null
  }
  header: {
    nav: NavItem[]
    primaryCta: CtaSlot
    secondaryCta?: CtaSlot | null
  }
  topBanner?: {
    enabled: boolean
    text: string
    href?: string | null
    linkLabel?: string | null
  } | null
  footer: {
    tagline: string
    groups: FooterGroup[]
    legal: { copyright: string; links: Array<{ label: string; href: string }> }
    social: SocialLink[]
  }
  home: {
    hero: HeroSlot
    trustStats: StatsSlot
    products: CardsSlot
    trustedBy: LogoStripSlot
    features: CardsSlot
    howItWorks: StepsSlot
    modernTeams: BulletsSlot
    privacyInfra: ProseSlot
    compliance: BulletsSlot
    blog: BlogGridSlot
    pricing: PricingSlot
    forWho: BulletsSlot
    faq: FaqSlot
    cta: CtaBlockSlot
  }
  mobile: {
    hero: HeroSlot & { image?: ImageSlot | null }
    features: CardsSlot
    howItWorks: StepsSlot
    faq: FaqSlot
    cta: CtaBlockSlot
  }
  business: {
    hero: HeroSlot
    forWho: BulletsSlot
    modernTeams: BulletsSlot
    privacyInfra: ProseSlot
    compliance: BulletsSlot
    trustStats: StatsSlot
    faq: FaqSlot
    cta: CtaBlockSlot
  }
  pricing: {
    hero: HeroSlot
    plans: PricingSlot
    features: BulletsSlot
    faq: FaqSlot
  }
  blog: {
    hero: HeroSlot
    grid: BlogGridSlot
  }
  contact: {
    hero: HeroSlot
    departments: DepartmentSlot[]
  }
  privacy: LegalSlot
  terms: LegalSlot
}

const BRAND = 'Liquidity Accord'

export const site: SiteConfig = {
  meta: {
    brandName: BRAND,
    tagline: 'Confidential performance bonds for market-makers and parametric delisting insurance',
    description:
      'Retainer releases only when measured KPIs are met. Everything else stays private. Built on ReineiraOS (Arbitrum + Fhenix CoFHE) with NGFA risk models.',
    siteUrl: 'https://liquidityaccord.io',
    email: {
      support: 'support@ngfa.eu',
      sales: 'sales@ngfa.eu',
      media: 'media@ngfa.eu',
      dev: 'dev@ngfa.eu',
    },
    social: [
      { label: 'X', href: 'https://x.com/ngfa_eu', icon: 'Globe' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/ngfa', icon: 'Globe' },
    ],
    appUrl: 'https://app.liquidityaccord.io',
    githubUrl: null,
    docsUrl: null,
    keywords: [
      'market maker performance bonds',
      'delisting insurance',
      'confidential escrow',
      'parametric cover',
      'KPI verification',
      'Reclaim Protocol zkTLS',
      'Fhenix CoFHE',
      'ReineiraOS',
      'NGFA',
      'on-chain MM accountability',
      'token issuer treasury',
    ],
    twitterHandle: '@ngfa_eu',
  },
  branding: {
    accent: '#0099FF',
    fontSans: null,
    fontMono: null,
    borderRadius: null,
    borderWidth: null,
    faviconInitial: 'L',
  },
  header: {
    nav: [
      {
        label: 'Product',
        items: [
          { label: 'How it works', description: 'KPI-gated retainer release', href: '/#how-it-works', icon: 'Monitor' },
          { label: 'Delisting insurance', description: 'LP-backed parametric cover', href: '/#features', icon: 'ShieldCheck' },
          { label: 'For operators', description: 'MM-side dashboard and tools', href: '/mobile', icon: 'DeviceMobile' },
        ],
      },
      {
        label: 'Solutions',
        items: [
          { label: 'For token issuers', description: 'Pay only when MMs hit measurable KPIs', href: '/business', icon: 'Buildings' },
          { label: 'For market-makers', description: 'On-chain certified track record', href: '/mobile', icon: 'User' },
          { label: 'For LPs', description: 'Earn parametric yield on protection pools', href: '/business', icon: 'ChartLine' },
        ],
      },
      {
        label: 'Resources',
        items: [
          { label: 'Blog', description: 'Market structure, KPIs, NGFA research', href: '/blog', icon: 'Article' },
          { label: 'Contact', description: 'Pilot inquiries and partnerships', href: '/contact', icon: 'EnvelopeSimple' },
        ],
      },
      { label: 'Pricing', href: '/pricing' },
    ],
    primaryCta: { label: 'Request pilot access', href: '/contact' },
    secondaryCta: { label: 'Talk to NGFA', href: '/contact' },
  },
  topBanner: {
    enabled: true,
    text: 'Phase 1 testnet launching May 2026 — Coinbase pilot, then Kraken',
    href: '/business',
    linkLabel: 'Read the roadmap',
  },
  footer: {
    tagline: 'Confidential performance bonds for market-makers and delisting insurance for token issuers — productized NGFA risk models on ReineiraOS.',
    groups: [
      {
        title: 'Product',
        links: [
          { label: 'How it works', href: '/#how-it-works' },
          { label: 'Operator tools', href: '/mobile' },
          { label: 'Pricing', href: '/pricing' },
        ],
      },
      {
        title: 'Solutions',
        links: [
          { label: 'Token issuers', href: '/business' },
          { label: 'Market-makers', href: '/mobile' },
          { label: 'LPs', href: '/business' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Blog', href: '/blog' },
          { label: 'Contact', href: '/contact' },
          { label: 'FAQ', href: '/#faq' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
        ],
      },
    ],
    legal: {
      copyright: `© ${new Date().getFullYear()} NextGen Financial Analytics. ${BRAND} is operated under NGFA (ngfa.eu).`,
      links: [
        { label: 'Terms', href: '/terms' },
        { label: 'Privacy', href: '/privacy' },
      ],
    },
    social: [
      { label: 'X', href: 'https://x.com/ngfa_eu', icon: 'Globe' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/ngfa', icon: 'Globe' },
    ],
  },
  home: {
    hero: {
      eyebrow: 'NGFA × ReineiraOS × Fhenix',
      title: 'Retainer releases only when measured KPIs are met.',
      subtitle:
        'Confidential performance bonds for market-makers, plus LP-backed parametric cover for unexpected delistings. Spreads, depth, uptime — measured by zkTLS-attested exchange data, not invoices.',
      primaryCta: { label: 'Request pilot access', href: '/contact' },
      secondaryCta: { label: 'See how it works', href: '/#how-it-works' },
    },
    trustStats: {
      eyebrow: 'The opportunity',
      items: [
        { value: '$30–80B', label: 'Annual MM retainer spend by token issuers' },
        { value: '$1.5–3B', label: 'Annual delisting-driven loss across top-20 CEX' },
        { value: '$2–4B', label: 'DeFi insurance GWP addressable by 2028' },
        { value: '$16T', label: 'Tokenized RWA listings projected by 2030 (BCG)' },
      ],
    },
    products: {
      eyebrow: 'What we ship',
      title: 'Two products, one settlement layer',
      subtitle:
        'Conditional escrow for retainer payments. LP-backed parametric cover for delistings. Same KPI feed, same encrypted ledger.',
      items: [
        {
          id: 'escrow',
          icon: 'Lock',
          title: 'Confidential performance escrow',
          description:
            'Issuer funds a monthly retainer into ConfidentialEscrow. Tranches release only when zkTLS-attested KPI scores cross thresholds. Amounts FHE-encrypted end-to-end.',
          href: '/#how-it-works',
          badge: 'Phase 1',
        },
        {
          id: 'cover',
          icon: 'ShieldCheck',
          title: 'Delisting insurance policy',
          description:
            'LP-backed parametric cover (1–5% of nominal). UMA Optimistic Oracle resolves trigger events. Auto-payout on delisting — no claim form, no broker.',
          href: '/business',
          badge: 'Phase 1',
        },
      ],
    },
    trustedBy: {
      title: 'Built with and verified through',
      logos: [
        { name: 'ReineiraOS' },
        { name: 'Fhenix CoFHE' },
        { name: 'Reclaim Protocol' },
        { name: 'UMA Oracle V3' },
        { name: 'Chainlink' },
        { name: 'Circle CCTP v2' },
      ],
    },
    features: {
      eyebrow: 'Why Liquidity Accord',
      title: 'Measured, encrypted, parametric — by default',
      subtitle:
        'Every retainer tranche is gated by independent KPI proofs. Every delisting is covered automatically. Every commercial term stays private.',
      items: [
        {
          id: 'kpi-verification',
          icon: 'CurrencyCircleDollar',
          title: 'zkTLS KPI verification',
          description:
            'Reclaim Protocol attests spreads, depth, uptime, and manipulation scores from exchange APIs cryptographically — no shared keys, no trust assumption.',
          image: imagePlaceholder('zkTLS attestation flow — exchange API to on-chain proof', 1920, 1080),
        },
        {
          id: 'conditional-escrow',
          icon: 'Lock',
          title: 'Conditional retainer release',
          description:
            'LiquidityAccordResolver scores each measurement window. Funds release tranche-by-tranche only when scores match the engagement’s thresholds — encrypted from start to finish.',
          image: imagePlaceholder('Tranche release timeline visualization', 960, 720),
        },
        {
          id: 'parametric-cover',
          icon: 'ShieldCheck',
          title: 'Parametric delisting cover',
          description:
            'Premium pricing in FHE. Pool capital from LPs. Trigger via UMA Oracle. Payout the moment a delisting event resolves — silent-failure, no manual claim.',
          image: imagePlaceholder('LP-backed pool with parametric trigger diagram', 960, 720),
        },
        {
          id: 'private-by-default',
          icon: 'ShieldCheck',
          title: 'Commercial terms stay private',
          description:
            'Retainer amounts, premium rates, and risk scores never leak. Competing market-makers and observers see nothing — solving the term-intel leakage that plagues email-based MM agreements.',
          image: imagePlaceholder('FHE encryption boundary visualization', 960, 720),
        },
        {
          id: 'multi-venue',
          icon: 'Globe',
          title: 'Multi-venue aggregation (Phase 2)',
          description:
            'KPI verification across 5+ venues — Coinbase, Kraken, Bybit, Gate.io, Uniswap. Pool writes parametric cover for any token listed on any of them.',
          image: imagePlaceholder('Multi-venue KPI aggregation diagram', 960, 720),
        },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'From engagement to verified performance',
      subtitle:
        'No new exchange integration for the MM. What changes is when retainer releases — and what gets covered.',
      steps: [
        {
          number: '01',
          title: 'Issuer funds the engagement',
          description:
            'Retainer is escrowed into ConfidentialEscrow with FHE-encrypted amount. KPI thresholds (spread, depth, uptime) are signed off by both sides.',
        },
        {
          number: '02',
          title: 'Coordinator quorum attests KPI',
          description:
            'Reclaim Protocol pulls signed exchange data. Multiple Coordinators independently sign the measurement window. LiquidityAccordResolver scores it.',
        },
        {
          number: '03',
          title: 'Tranche releases on score match',
          description:
            'Funds flow to the MM only when scores meet thresholds. Below threshold → tranche held or shortfall rebate fires. Delisting? Parametric cover pays out.',
        },
      ],
    },
    modernTeams: {
      eyebrow: 'What changes for the desk',
      title: 'From invisible MM performance to on-chain reputation',
      subtitle:
        'Issuers, market-makers, and LPs all see the same verified data. Track records survive engagement turnover and become composable across venues.',
      items: [
        {
          icon: 'ChartLine',
          title: 'Retainers tied to measurable performance',
          description: 'Issuers stop paying $1M+ a year for spreads and depth they cannot independently verify.',
        },
        {
          icon: 'ShieldCheck',
          title: 'Delisting risk is covered, not absorbed',
          description: 'Parametric cover triggers on event. Treasury exposure to a CEX delist drops from total to deductible.',
        },
        {
          icon: 'Handshake',
          title: 'NGFA-certified MM track record',
          description: 'Cumulative KPI history is on-chain, encrypted, and survives engagement boundaries — composable reputation.',
        },
      ],
    },
    privacyInfra: {
      eyebrow: 'Why privacy matters',
      title: 'Encrypted bonds that still settle and prove KPI compliance',
      subtitle:
        'Email-based MM agreements leak terms to competitors and gut renegotiation power. Liquidity Accord keeps every commercial number encrypted while still verifying KPI compliance on-chain.',
      paragraphs: [
        'FHE encrypts retainer amounts, premium rates, and risk scores. The protocol proves that KPI thresholds were met — without revealing the thresholds, the underlying numbers, or the counterparty pricing to anyone outside the engagement.',
        'Reclaim Protocol verifies the underlying exchange data via zkTLS without exposing API credentials. UMA Optimistic Oracle resolves delisting events without a centralised broker. The result: a settlement layer with zero competitive intelligence leakage and full programmatic accountability.',
      ],
      image: imagePlaceholder('Liquidity Accord encryption boundary diagram — FHE + zkTLS', 1200, 800),
      bullets: [
        { title: 'FHE-encrypted', description: 'Amounts, premiums, and scores are encrypted before they hit settlement.' },
        { title: 'zkTLS-attested', description: 'Exchange data verified cryptographically — no shared keys, no trust.' },
      ],
    },
    compliance: {
      eyebrow: 'Regulatory readiness',
      title: 'Aligned with the frameworks that govern public token markets',
      subtitle: 'Built to satisfy MiCA / CASPR disclosures while keeping commercial data confidential.',
      items: [
        {
          icon: 'ShieldCheck',
          title: 'EU — MiCA / CASPR',
          description: 'Phase 1 legal review with European counsel. Parametric disclosures aligned for Phase 3 multi-venue rollout.',
        },
        {
          icon: 'ClipboardText',
          title: 'US — issuer disclosures',
          description: 'Coinbase pilot designed around US issuer disclosure expectations and parametric-cover treatment.',
        },
        {
          icon: 'Scales',
          title: 'Audit & verification',
          description: 'Trail of Bits / Sparql audit track. Chainlink price feeds for risk scoring. NGFA-authored KPI templates.',
        },
      ],
    },
    blog: {
      eyebrow: 'NGFA research',
      title: 'Market structure, KPI design, parametric cover',
      subtitle: 'Notes from the venues, desks, and capital pools we operate on.',
      posts: [
        {
          slug: 'why-mm-retainers-dont-work',
          category: 'Market structure',
          title: 'Why monthly MM retainers reward attendance, not performance',
          description:
            '$30–80B/yr is paid out without independent KPI verification. We unpack what spreads, depth, and uptime would look like if measured the way NGFA proposes.',
          date: 'Apr 2026',
          readTime: '8 min read',
          author: 'NGFA research',
        },
        {
          slug: 'parametric-delisting-cover',
          category: 'Product',
          title: 'Parametric delisting cover, explained in one engagement',
          description:
            'A 1–5% premium on cover nominal triggers on UMA Oracle resolution. Same-day automatic payout. Here’s the full LP economics.',
          date: 'Apr 2026',
          readTime: '6 min read',
          author: 'Liquidity Accord team',
        },
        {
          slug: 'kpi-thresholds-template',
          category: 'Research',
          title: 'NGFA KPI threshold template — spread, depth, uptime, manipulation score',
          description:
            'Open template for the measurement parameters used in LiquidityAccordResolver. Designed for Coinbase, Kraken, Bybit, Gate.io, and Uniswap.',
          date: 'Mar 2026',
          readTime: '7 min read',
          author: 'NGFA research',
        },
      ],
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Premiums and fees scale with engagement size',
      subtitle:
        'Performance escrow for issuer–MM engagements. Parametric cover priced 1–5% of nominal. SaaS dashboards for issuers and certified MMs.',
      plans: [
        {
          name: 'Performance escrow',
          price: '15–30 bps',
          period: 'per tranche on release',
          description: 'Conditional retainer escrow with KPI-gated tranche release.',
          features: [
            'FHE-encrypted retainer amounts',
            'zkTLS-attested KPI verification',
            'Tranche-by-tranche release',
            'NGFA-certified MM directory access',
          ],
          cta: { label: 'Request pilot access', href: '/contact' },
        },
        {
          name: 'Delisting cover',
          price: '1–5%',
          period: 'of cover nominal',
          description: 'LP-backed parametric cover for unexpected delisting events.',
          features: [
            'UMA Oracle resolution',
            'Same-day automatic payout',
            'Multi-venue eligible (Phase 2)',
            'Optional MM credit + shortfall riders',
          ],
          cta: { label: 'Talk to sales', href: '/contact' },
          featured: true,
        },
        {
          name: 'Issuer dashboard',
          price: '$20–100K',
          period: '/month',
          description: 'Treasury-grade SaaS for token issuers running active MM programs.',
          features: [
            'Real-time engagement monitoring',
            'KPI evidence + signed Coordinator attestations',
            'Parametric cover management',
            'Dedicated NGFA risk-team access',
          ],
          cta: { label: 'Contact sales', href: '/contact' },
        },
      ],
    },
    forWho: {
      eyebrow: 'Built for',
      title: 'Every counterparty in the public token-listing stack',
      subtitle:
        'First 3 issuers and 25 certified MMs onboard Phase 1. Multi-venue scale through the same rails in Phase 2.',
      items: [
        { icon: 'Buildings', title: 'Token issuers', description: 'Pay for measurable spreads and depth — not invoices.' },
        { icon: 'User', title: 'Market-makers', description: 'On-chain reputation that survives engagement turnover.' },
        { icon: 'ChartLine', title: 'LP capital', description: 'Earn parametric yield on protection pools (target 18–28% net).' },
        { icon: 'Briefcase', title: 'Hedge funds & desks', description: 'Monitor MM quality across venues with NGFA-certified data.' },
        { icon: 'Globe', title: 'Exchanges', description: 'Co-marketing on listed-token quality signals for issuer pilots.' },
        { icon: 'Handshake', title: 'Foundations', description: 'Treasury risk hedging for engagement spend over $1M/yr.' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Common questions',
      subtitle: 'More? Email dev@ngfa.eu or sales@ngfa.eu.',
      items: [
        {
          question: 'How does conditional retainer release actually work?',
          answer:
            'Issuer escrows the retainer into ConfidentialEscrow with FHE-encrypted amount. Each measurement window, Coordinators sign zkTLS-attested KPI data; LiquidityAccordResolver scores it against engagement thresholds. Only the matching tranche releases — anything below threshold stays in escrow or triggers shortfall rebate.',
        },
        {
          question: 'Who funds the delisting insurance pools?',
          answer:
            'Independent LPs deposit USDC or EURC into ConfidentialCoverageManager pools. They earn share of parametric premiums when nothing triggers and the pool covers payouts automatically when an UMA-resolved delisting event hits. Y1 pool target: $5–10M TVL, expected event rate 3–8% annualized, net LP return 18–28%.',
        },
        {
          question: 'What stays encrypted?',
          answer:
            'Retainer amounts, premium rates, KPI thresholds, risk scores, and counterparty terms — all FHE-encrypted. The protocol proves that thresholds were met without revealing the underlying numbers to competing MMs, observers, or intermediaries.',
        },
        {
          question: 'Which venues are live in Phase 1 vs Phase 2?',
          answer:
            'Phase 1 (May–July 2026 testnet): Coinbase pilot. Phase 1 mainnet adds Kraken. Phase 2 expands to Bybit, Gate.io, and Uniswap with multi-venue KPI aggregation. Phase 3 layers MiCA / CASPR parametric disclosures for EU issuers.',
        },
      ],
    },
    cta: {
      title: 'Run the next MM engagement on programmable KPIs',
      subtitle: 'Phase 1 testnet pilots open now. Three issuer slots, twenty-five MM certifications, $5M bonded LP capital target.',
      primaryCta: { label: 'Request pilot access', href: '/contact' },
      secondaryCta: { label: 'Talk to NGFA', href: '/contact' },
    },
  },
  mobile: {
    hero: {
      eyebrow: 'For market-makers',
      title: 'Liquidity Accord on the desk',
      subtitle:
        'Track engagements, watch KPI scores update in real time, see tranche releases the moment Coordinator quorum signs — from the trading desk or on the move.',
      primaryCta: { label: 'Request access', href: '/contact' },
      secondaryCta: { label: 'See pricing', href: '/pricing' },
      image: imagePlaceholder('MM dashboard — engagements, KPI scores, tranche releases', 750, 1334),
    },
    features: {
      eyebrow: 'Operator tools',
      title: 'Everything an MM needs to defend a retainer',
      subtitle: 'Built around the workflows of a desk running 5+ engagements across 3+ venues.',
      items: [
        {
          id: 'kpi-monitor',
          icon: 'Monitor',
          title: 'Live KPI scoring',
          description: 'Spread, depth, uptime, and manipulation scores update each measurement window. See the score before the Coordinator quorum signs.',
        },
        {
          id: 'engagements',
          icon: 'ShieldCheck',
          title: 'Engagement registry',
          description: 'Every active engagement, every threshold, every tranche release schedule — encrypted but accessible to the parties.',
        },
        {
          id: 'attestations',
          icon: 'Lightning',
          title: 'Attestation alerts',
          description: 'A late tranche, a missed window, a Coordinator dispute — alerts hit before issuer treasury notices.',
        },
      ],
    },
    howItWorks: {
      eyebrow: 'Three taps',
      title: 'From engagement to certified track record',
      steps: [
        { number: '01', title: 'Sign the engagement', description: 'Counter-sign issuer thresholds. Retainer escrows automatically.' },
        { number: '02', title: 'Run the desk', description: 'Quote at the threshold, hit uptime, defend depth — everything else is automated.' },
        { number: '03', title: 'Tranches release, reputation builds', description: 'Score-matched tranches release each window; aggregate KPIs grow your NGFA-certified track record.' },
      ],
    },
    faq: {
      eyebrow: 'MM FAQ',
      title: 'Questions from the desk',
      items: [
        { question: 'Do I need to expose API keys to anyone?', answer: 'No. Reclaim Protocol uses zkTLS — proofs of exchange API responses without sharing credentials. Your keys never leave your infrastructure.' },
        { question: 'What happens to a tranche if I miss a single window?', answer: 'A single missed window tightens the score for that tranche only. The engagement’s rolling KPI history stays intact, and you keep eligibility — adjustments are window-local, not engagement-global.' },
      ],
    },
    cta: {
      title: 'Join the Phase 1 MM cohort',
      subtitle: 'Twenty-five NGFA-certified MM slots open. Coinbase first, Kraken next.',
      primaryCta: { label: 'Request access', href: '/contact' },
    },
  },
  business: {
    hero: {
      eyebrow: 'For token issuers and treasuries',
      title: 'Programmable MM accountability with parametric delisting cover.',
      subtitle:
        'Stop paying retainers without independent KPI verification. Hedge delisting risk with LP-backed parametric cover. Every commercial term stays encrypted between you and the MM.',
      primaryCta: { label: 'Talk to NGFA', href: '/contact' },
      secondaryCta: { label: 'See pricing', href: '/pricing' },
    },
    forWho: {
      eyebrow: 'Who it’s for',
      title: 'Foundations and treasuries running active MM programs',
      subtitle: 'From projects with $1M+ yearly MM spend to enterprise treasuries running multi-venue engagements.',
      items: [
        { icon: 'Buildings', title: 'Token foundations', description: 'Convert opaque retainers into KPI-verified, tranche-released bonds.' },
        { icon: 'Globe', title: 'Multi-venue treasuries', description: 'Coinbase + Kraken Phase 1; Bybit, Gate.io, Uniswap rolling in Phase 2.' },
        { icon: 'Briefcase', title: 'Enterprise issuers', description: 'NGFA-certified data feeds for board-level reporting and auditor signoff.' },
      ],
    },
    modernTeams: {
      eyebrow: 'What changes for the treasury',
      title: 'Lower spend, higher accountability, hedged delisting risk',
      subtitle: 'The escrow, KPI verification, and parametric cover all run on the same encrypted infrastructure.',
      items: [
        { icon: 'ChartLine', title: 'Retainer spend tracks measured performance', description: 'Tranche-gated release means $0 paid for unverified spreads or missed uptime.' },
        { icon: 'ShieldCheck', title: 'Delisting cover is parametric', description: '1–5% premium on cover nominal — no claim form, no broker, automatic payout on UMA resolution.' },
        { icon: 'Handshake', title: 'Reputation is composable', description: 'NGFA-certified MM track record survives engagement boundaries and venue changes.' },
      ],
    },
    privacyInfra: {
      eyebrow: 'Privacy by design',
      title: 'Email-based MM agreements leak. Liquidity Accord doesn’t.',
      subtitle: 'Commercial terms are encrypted end-to-end. Only the issuer and the MM see retainer amounts, premium rates, or KPI thresholds.',
      paragraphs: [
        'Term-intel leakage from email-based MM agreements destroys renegotiation power. Liquidity Accord runs the verification and settlement on FHE-encrypted data — competing MMs, observers, and intermediaries see nothing while NGFA-certified KPI proofs still satisfy auditors and counsel.',
      ],
      image: imagePlaceholder('Treasury-grade encryption architecture diagram', 1200, 800),
      bullets: [
        { title: 'FHE end-to-end', description: 'Amounts and scores never leak beyond the engagement.' },
        { title: 'Selective disclosure', description: 'Prove KPI compliance to auditors without revealing thresholds.' },
      ],
    },
    compliance: {
      eyebrow: 'Compliance',
      title: 'Regulatory-aligned across listed-token markets',
      items: [
        { icon: 'ShieldCheck', title: 'EU — MiCA / CASPR', description: 'Phase 1 legal review with European counsel; Phase 3 parametric disclosures.' },
        { icon: 'ClipboardText', title: 'US — issuer disclosure', description: 'Coinbase pilot designed around US disclosure expectations.' },
      ],
    },
    trustStats: {
      eyebrow: 'Phase ramp',
      items: [
        { value: '$1.8–4.8M', label: 'Phase 1 annualized revenue (Coinbase pilot)' },
        { value: '$12–30M', label: 'Phase 2 annualized (+Kraken, 10 engagements)' },
        { value: '$216–336M', label: 'Phase 3 annualized (+Bybit, DEX)' },
        { value: '$80–150M/mo', label: 'Phase 5 institutional scale' },
      ],
    },
    faq: {
      eyebrow: 'Treasury FAQ',
      title: 'Questions from issuers and counsel',
      items: [
        { question: 'How does this differ from running an MM RFP?', answer: 'An RFP picks an MM. Liquidity Accord measures their performance and gates their pay. The RFP is the start of an engagement; the protocol is what runs for its full lifetime.' },
        { question: 'Can we self-attest KPIs instead of using Reclaim Protocol?', answer: 'Self-attestation defeats the entire purpose. Reclaim Protocol uses zkTLS to prove exchange API responses cryptographically — neither side can manipulate the underlying data.' },
      ],
    },
    cta: {
      title: 'Run the next engagement on programmable accountability',
      subtitle: 'NGFA can scope a pilot in 2–4 weeks. Phase 1 testnet open through July 2026.',
      primaryCta: { label: 'Talk to NGFA', href: '/contact' },
      secondaryCta: { label: 'See pricing', href: '/pricing' },
    },
  },
  pricing: {
    hero: {
      eyebrow: 'Pricing',
      title: 'Premiums scale with engagement size — no fixed minimums',
      subtitle:
        'Performance escrow at 15–30 bps per tranche. Delisting cover 1–5% of nominal. Issuer dashboards $20–100K/mo. MM certification $30–200K/yr.',
      primaryCta: { label: 'Request pilot access', href: '/contact' },
      secondaryCta: { label: 'Talk to NGFA', href: '/contact' },
    },
    plans: {
      title: 'One protocol. Three buyer types.',
      subtitle: 'Pick the lane that matches your role in the listing stack.',
      plans: [
        {
          name: 'Performance escrow',
          price: '15–30 bps',
          period: 'per tranche on release',
          description: 'KPI-gated retainer escrow.',
          features: ['FHE-encrypted retainer', 'zkTLS-attested KPI', 'Tranche-by-tranche release', 'NGFA MM directory'],
          cta: { label: 'Request pilot access', href: '/contact' },
        },
        {
          name: 'Delisting cover',
          price: '1–5%',
          period: 'of cover nominal',
          description: 'LP-backed parametric cover for unexpected delisting events.',
          features: ['UMA Oracle resolution', 'Same-day automatic payout', 'Multi-venue eligible (Phase 2)', 'MM credit + shortfall riders'],
          cta: { label: 'Talk to sales', href: '/contact' },
          featured: true,
        },
        {
          name: 'Issuer dashboard',
          price: '$20–100K',
          period: '/month',
          description: 'Treasury-grade SaaS for active MM programs.',
          features: ['Real-time engagement monitoring', 'Signed Coordinator attestations', 'Parametric cover management', 'Dedicated NGFA risk-team'],
          cta: { label: 'Contact sales', href: '/contact' },
        },
      ],
    },
    features: {
      eyebrow: 'Across every plan',
      title: 'What every Liquidity Accord engagement includes',
      items: [
        { icon: 'Check', title: 'zkTLS KPI verification', description: 'Spreads, depth, uptime, manipulation score from Reclaim-attested exchange data.' },
        { icon: 'Check', title: 'FHE-encrypted commercial terms', description: 'Amounts and rates never leak to competing MMs or observers.' },
        { icon: 'Check', title: 'NGFA-certified MM directory', description: 'On-chain reputation history that survives engagement boundaries.' },
        { icon: 'Check', title: 'Multi-venue ready', description: 'Coinbase + Kraken Phase 1; Bybit, Gate.io, Uniswap Phase 2.' },
        { icon: 'Check', title: 'Parametric cover available', description: 'Optional add-on for delisting risk hedging.' },
        { icon: 'Check', title: 'MiCA / CASPR alignment', description: 'Phase 3 disclosures designed with EU counsel.' },
      ],
    },
    faq: {
      eyebrow: 'Pricing FAQ',
      title: 'Before you sign up',
      items: [
        { question: 'Is there an annual minimum?', answer: 'No. Performance escrow scales per tranche. Issuer dashboard SaaS is monthly. MM certification is annual but tier-based.' },
        { question: 'How are LP returns priced?', answer: 'Pool target Y1: $5–10M TVL, average premium rate 2–4% of cover nominal, expected event rate 3–8% annualized. Net LP return projected 18–28% — premiums minus expected payouts minus 0.5% AUM management fee.' },
      ],
    },
  },
  blog: {
    hero: {
      eyebrow: 'Blog',
      title: 'NGFA research and product notes',
      subtitle: 'Market structure, KPI engineering, parametric cover economics.',
      primaryCta: { label: 'Subscribe', href: '/contact' },
    },
    grid: {
      title: 'All posts',
      posts: [
        {
          slug: 'why-mm-retainers-dont-work',
          category: 'Market structure',
          title: 'Why monthly MM retainers reward attendance, not performance',
          description:
            '$30–80B/yr is paid out without independent KPI verification. We unpack what spreads, depth, and uptime would look like if measured the way NGFA proposes.',
          date: 'Apr 2026',
          readTime: '8 min read',
          author: 'NGFA research',
        },
        {
          slug: 'parametric-delisting-cover',
          category: 'Product',
          title: 'Parametric delisting cover, explained in one engagement',
          description:
            'A 1–5% premium on cover nominal triggers on UMA Oracle resolution. Same-day automatic payout. Here’s the full LP economics.',
          date: 'Apr 2026',
          readTime: '6 min read',
          author: 'Liquidity Accord team',
        },
        {
          slug: 'kpi-thresholds-template',
          category: 'Research',
          title: 'NGFA KPI threshold template — spread, depth, uptime, manipulation score',
          description:
            'Open template for the measurement parameters used in LiquidityAccordResolver.',
          date: 'Mar 2026',
          readTime: '7 min read',
          author: 'NGFA research',
        },
      ],
    },
  },
  contact: {
    hero: {
      eyebrow: 'Contact',
      title: 'Talk to Liquidity Accord',
      subtitle: 'Pilots, certification, partnerships, or media — we typically reply within one business day.',
      primaryCta: { label: 'Email us', href: 'mailto:sales@ngfa.eu' },
    },
    departments: [
      { icon: 'Lifebuoy', label: 'General', email: 'support@ngfa.eu', description: 'Engagement help, onboarding, account questions.' },
      { icon: 'Code', label: 'Engineering', email: 'dev@ngfa.eu', description: 'Reclaim integrations, Coordinator infrastructure, FHE worker access.' },
      { icon: 'Handshake', label: 'Partnerships & media', email: 'media@ngfa.eu', description: 'Press, exchange co-marketing, NGFA research collaboration.' },
      { icon: 'Briefcase', label: 'Sales', email: 'sales@ngfa.eu', description: 'Issuer dashboards, MM certification, pilot scoping.' },
    ],
  },
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    effectiveDate: 'May 2026',
    markdown:
      '<section><h2>Overview</h2><p>' + lorem('long-paragraph') + '</p></section>' +
      '<section><h2>Data we collect</h2><p>' + lorem('long-paragraph') + '</p></section>' +
      '<section><h2>Encrypted and never collected</h2><p>Retainer amounts, premium rates, KPI thresholds, and risk scores are FHE-encrypted at the protocol layer. Liquidity Accord operates the protocol — it does not, and cannot, decrypt these fields.</p></section>' +
      '<section><h2>Contact</h2><p>For privacy questions, email support@ngfa.eu.</p></section>',
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Terms of Service',
    effectiveDate: 'May 2026',
    markdown:
      '<section><h2>Acceptance of terms</h2><p>' + lorem('long-paragraph') + '</p></section>' +
      '<section><h2>Nature of services</h2><p>Liquidity Accord is a confidential settlement protocol for market-maker performance bonds and delisting insurance, operated by NextGen Financial Analytics on ReineiraOS. It is not a bank, broker-dealer, money services business, or insurance carrier — parametric cover is provided by independent LP capital pools.</p></section>' +
      '<section><h2>Regulatory</h2><p>EU flows are aligned with MiCA / CASPR; Phase 3 introduces parametric disclosures. US flows are designed with issuer disclosure expectations in mind. Audit track via Trail of Bits / Sparql.</p></section>' +
      '<section><h2>Contact</h2><p>For legal questions, email sales@ngfa.eu.</p></section>',
  },
}
