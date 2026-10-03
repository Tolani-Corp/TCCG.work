import contextData from "../../config/public-product-context.json";

export type TccgConversionEvent =
  | "public_page_viewed"
  | "tccg_project_review_started"
  | "tccg_qualification_review_started"
  | "tccg_intake_email_prepared"
  | "tccg_intake_submitted"
  | "tccg_intake_delivery_failed";

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
    system: "POST /api/intake";
    fallback: "mailto:info@tccg.work";
    durableAcceptanceRequires: "TCCG_INTAKE_WEBHOOK_URL";
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
