import type { Metadata } from "next";

import { PublicInfoPage } from "@/components/PublicInfoPage";
import { capabilityStatement } from "@/lib/digitalLaunch";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "TCCG core competencies, differentiators, NAICS focus and qualification controls.",
};

export default function CapabilitiesPage() {
  return (
    <PublicInfoPage
      eyebrow="Capabilities Statement"
      title={`${capabilityStatement.legalName} — ${capabilityStatement.tagline}`}
      intro={capabilityStatement.positioning}
      notice="Government identifiers, contractor licenses, certifications, bonding capacity, insurance limits and past-performance claims are released only after current documentary verification. Contact TCCG for an opportunity-specific qualification package."
      primaryCta={{ label: "Request qualification package", href: "/contact" }}
      secondaryCta={{ label: "Open Digital Launch", href: "/digital-launch" }}
      sections={[
        { title: "Core Competencies", items: capabilityStatement.coreCompetencies },
        { title: "Differentiators", items: capabilityStatement.differentiators },
        { title: "Initial NAICS Focus", items: capabilityStatement.naics.map((code) => `NAICS ${code} — validate solicitation-specific fit and current size standard`) },
        { title: "Qualification Controls", items: capabilityStatement.verifiedOnlyFields.map((field) => `${field} — verify before external use`) },
        { title: "Digital Delivery", items: ["BIM and CDE standards", "estimate-to-cost-code continuity", "procurement and long-lead controls", "QC/HSE evidence", "owner dashboards", "governed AI staff prototypes"] },
        { title: "Government Capture", items: ["SAM/UEI/CAGE verification", "SBA profile/certification verification", "solicitation compliance matrix", "bonding/insurance gate", "labor and cybersecurity clause review", "evidence-backed past performance"] },
      ]}
    />
  );
}
