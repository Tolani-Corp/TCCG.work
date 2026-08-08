import type { Metadata } from "next";

import { PublicInfoPage } from "@/components/PublicInfoPage";

export const metadata: Metadata = {
  title: "About",
  description: "TC Construction Group operating philosophy, technology model and Tolani ecosystem alignment.",
};

export default function AboutPage() {
  return (
    <PublicInfoPage
      eyebrow="About TCCG"
      title="A construction company designed to make project information as disciplined as field execution."
      intro="TC Construction Group is building a technology-forward delivery model within the Tolani Corp ecosystem. TCCG focuses on construction execution and commercial delivery while Tolani Labs supports training, R&D and governed digital capabilities."
      primaryCta={{ label: "Review services", href: "/services" }}
      secondaryCta={{ label: "Contact TCCG", href: "/contact" }}
      sections={[
        { title: "Operating Philosophy", items: ["evidence before claims", "scope before automation", "human authority for material project decisions", "information continuity from preconstruction to closeout", "repeatable standards with project-specific tailoring"] },
        { title: "Technology Model", items: ["BIM/VDC", "Common Data Environment", "structured estimating", "cost-code continuity", "digital procurement", "QC/HSE evidence", "owner dashboards", "governed AI assistants"] },
        { title: "Tolani Labs Role", items: ["construction training pipeline", "BIM and digital-delivery R&D", "agent evaluations", "skills and workflow development", "lessons-learned feedback"] },
        { title: "Commercial Discipline", items: ["bid/no-bid gates", "capacity and licensing checks", "bonding/insurance checks", "quote provenance", "subcontractor prequalification", "change and forecast controls"] },
        { title: "Public-Sector Discipline", items: ["registration verification", "solicitation compliance", "past-performance attribution", "bonding/payment-protection review", "labor/cyber clause review", "controlled proposal evidence"] },
        { title: "Building Beyond", body: "TCCG's direction is not to add technology for novelty. The operating model uses technology where it can reduce rework, improve visibility, strengthen evidence and make owners, partners and field teams more effective." },
      ]}
    />
  );
}
