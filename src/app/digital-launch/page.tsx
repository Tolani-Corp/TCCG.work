import type { Metadata } from "next";

import { DigitalLaunchCommandCenter } from "@/components/DigitalLaunchCommandCenter";

export const metadata: Metadata = {
  title: "Digital Launch | TC Construction Group",
  description:
    "TCCG Digital Launch command center for BIM, CDE, estimating, procurement, quality, safety, training, AI agents, risk transfer and government readiness.",
};

export default function DigitalLaunchPage() {
  return <DigitalLaunchCommandCenter />;
}
