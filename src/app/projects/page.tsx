import type { Metadata } from "next";

import { PublicInfoPage } from "@/components/PublicInfoPage";
import { portfolioPolicy } from "@/lib/digitalLaunch";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "TCCG verified project portfolio and evidence-controlled case-study policy.",
};

export default function ProjectsPage() {
  return (
    <PublicInfoPage
      eyebrow="TCCG Portfolio"
      title="Past performance should be proven before it is promoted."
      intro="TCCG is building a verified project portfolio that distinguishes corporate past performance, key-person experience, subcontract experience and teaming-partner experience. Each published case study must be supported by approved project evidence."
      notice={portfolioPolicy.rule}
      primaryCta={{ label: "Discuss relevant experience", href: "/contact" }}
      secondaryCta={{ label: "Review capabilities", href: "/capabilities" }}
      sections={[
        { title: "Corporate Past Performance", body: "Published only where the contracting TCCG entity's role, scope, dates, value and reference rights are verified.", items: ["contract role", "period of performance", "scope and value", "schedule / quality / safety outcomes", "reference authorization"] },
        { title: "Key-Person Experience", body: "Leadership and staff experience is labeled separately from TCCG corporate past performance so buyers can evaluate the evidence correctly.", items: ["individual role", "prior employer/entity", "project scope", "responsibility", "verifiable outcome"] },
        { title: "Teaming + Subcontract Experience", body: "Partner or subcontract experience is represented with the actual contractual role and attribution rather than implied prime performance.", items: ["prime / partner", "TCCG scope", "workshare", "reference rights", "performance evidence"] },
        { title: "Case-Study Release Gate", items: portfolioPolicy.caseStudyFields.slice(0, 7) },
        { title: "Outcome Evidence", items: portfolioPolicy.caseStudyFields.slice(7, 13) },
        { title: "Media + Reference Control", items: ["client/reference authorization", "photo/media release", "no sensitive owner information", "no protected government information", "release approval recorded"] },
      ]}
    />
  );
}
