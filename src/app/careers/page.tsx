import type { Metadata } from "next";

import { PublicInfoPage } from "@/components/PublicInfoPage";
import { trainingPipeline } from "@/lib/digitalLaunch";

export const metadata: Metadata = {
  title: "Careers + Training",
  description: "TCCG workforce development and Tolani Labs construction training pipeline.",
};

export default function CareersPage() {
  return (
    <PublicInfoPage
      eyebrow="Careers + Tolani Labs"
      title="Build construction talent through evaluated work, not course completion alone."
      intro="The TCCG workforce pipeline connects foundational construction knowledge, role-track training, simulation, supervised internship work and deployment. Role authorization depends on evaluated work products and appropriate supervision."
      primaryCta={{ label: "Contact TCCG", href: "/contact" }}
      secondaryCta={{ label: "Explore Digital Launch", href: "/digital-launch" }}
      sections={[
        ...trainingPipeline.map((stage) => ({ title: stage.stage, body: `Typical duration: ${stage.duration}`, items: stage.outcomes })),
        { title: "Priority Role Tracks", items: ["BIM / Revit / VDC", "estimating and quantity takeoff", "project controls", "QA/QC", "HSE", "field documentation", "procurement / submittals", "HVAC controls and building performance"] },
      ]}
    />
  );
}
