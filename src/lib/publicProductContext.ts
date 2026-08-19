import contextData from "../../config/public-product-context.json";

export type TccgConversionEvent =
  | "public_page_viewed"
  | "tccg_project_review_started"
  | "tccg_qualification_review_started"
  | "tccg_intake_email_prepared";

export type TccgPublicCta = {
  label: string;
  route: string;
  owner: string;
  downstreamState: string;
  event: TccgConversionEvent;
};

export type TccgPublicProductContext = {
  schemaVersion: string;
  entityId: "tccg.work";
  canonicalRepo: "Tolani-Corp/TCCG.work";
  canonicalDomain: "tccg.work";
  classification: "operating_company";
  publicStatus: "G2";
  commercialAuthority: "local_with_portfolio_governance";
  audiences: Array<{ id: string; jobToBeDone: string }>;
  offers: Array<{ id: string; status: string; description: string }>;
  valueProposition: string;
  differentiators: string[];
  approvedClaims: string[];
  conditionalClaims: string[];
  prohibitedClaims: string[];
  proof: string[];
  primaryCTA: TccgPublicCta;
  secondaryCTA: TccgPublicCta;
  operationalHandoff: {
    owner: string;
    state: string;
    system: "mailto:info@tccg.work";
  };
  pricing: null;
  serviceArea: null;
  legalAndCompliance: { rule: string };
  seo: {
    title: string;
    description: string;
  };
  analytics: {
    events: TccgConversionEvent[];
    funnel: string[];
  };
  contentOwner: string;
  evidenceOwner: string;
  reviewedAt: string;
  reviewExpiresAt: string;
};

export const tccgPublicProductContext = contextData as TccgPublicProductContext;
