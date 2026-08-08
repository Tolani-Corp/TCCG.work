import type { Metadata } from "next";

import { PublicMarketingSite } from "@/components/PublicMarketingSite";

export const metadata: Metadata = {
  title: "TC Construction Group | Building Beyond",
  description:
    "Technology-forward construction, HVAC, BIM/VDC, project controls, quality, safety and digital owner reporting from TC Construction Group.",
};

export default function Home() {
  return <PublicMarketingSite />;
}
