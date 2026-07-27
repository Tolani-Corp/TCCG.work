import type { Metadata } from "next";

import { MarketingLandingPage } from "@/components/MarketingLandingPage";

export const metadata: Metadata = {
  title: "Commercial Building Modernization, HVAC and BIM Coordination",
  description:
    "TC Construction Group reviews commercial building modernization, HVAC, controls, BIM and MEP coordination, renovation, smart-building, and public-sector opportunities.",
  alternates: { canonical: "https://tccg.work" },
};

export default function Home() {
  return <MarketingLandingPage />;
}
