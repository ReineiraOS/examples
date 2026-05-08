export interface DesignConfig {
  rationale: string
  overrides?: {
    borderRadius?: { button?: string; block?: string; xl?: string }
    borderWidth?: string
    fontSans?: string
    fontMono?: string
  }
}

export const design: DesignConfig = {
  rationale:
    'Liquidity Accord — canonical Privara-UI clone. Accent #0099FF (bright blue from NGFA brand deck) drives all accent variants on a dark institutional surface; no font or radius overrides (brief gave no explicit typography direction). Structure, component sequence, and page set are fixed per /scaffold-landing rules.',
}
