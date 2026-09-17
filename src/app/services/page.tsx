import type { Metadata } from "next";

import { PublicInfoPage } from "@/components/PublicInfoPage";

export const metadata: Metadata = {
  title: "Services",
  description: "TCCG commercial construction, HVAC, BIM/VDC, project-controls and digital-delivery service architecture.",
};

export default function ServicesPage() {
  return (
    <PublicInfoPage
      eyebrow="TCCG Services"
      title="Integrated construction delivery from scope through turnover."
      intro="TCCG organizes construction services around controlled scope, information continuity, field evidence and owner-ready closeout. Final service availability is confirmed against project location, licensing, staffing, bonding, insurance and contract requirements."
      primaryCta={{ label: "Request project review", href: "/contact" }}
      secondaryCta={{ label: "Review capabilities", href: "/capabilities" }}
      sections={[
        { title: "Commercial Construction", items: ["preconstruction and constructability", "construction management", "subcontractor coordination", "project controls", "commissioning and closeout"] },
        { title: "HVAC + Controls", items: ["modernization planning", "equipment and controls coordination", "indoor-air-quality troubleshooting", "long-lead management", "TAB/commissioning support", "owner training"] },
        { title: "BIM / VDC", items: ["BIM Execution Plans", "model federation", "clash and issue coordination", "constructability", "quantity support", "field and record-model handoff"] },
        { title: "Preconstruction + Estimating", items: ["bid/no-bid", "scope extraction", "takeoff and assemblies", "subcontractor/vendor coverage", "estimate reconciliation", "proposal turnover"] },
        { title: "Quality + HSE", items: ["inspection planning", "preparatory/initial/follow-up QC", "NCR control", "JHA/JSA workflows", "leading indicators", "corrective-action verification"] },
        { title: "Digital Project Delivery", items: ["CDE governance", "RFI/submittal/change controls", "procurement visibility", "owner dashboards", "AI-assisted administrative workflows", "lessons learned"] },
      ]}
    />
  );
}
