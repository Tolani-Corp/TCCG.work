import type { Metadata } from "next";

import { MarketingLandingPage } from "@/components/MarketingLandingPage";

export const metadata: Metadata = {
  title: "TCCG Operations Platform",
  description:
    "Sales-forward TCCG Work landing page for smart HVAC, BIM, ESG, public-sector capture, and construction operations.",
};

export default function Home() {
  return <MarketingLandingPage />;
}
