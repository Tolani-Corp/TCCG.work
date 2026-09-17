import type { Metadata } from "next";

import { PublicMarketingSite } from "@/components/PublicMarketingSite";
import { tccgPublicProductContext } from "@/lib/publicProductContext";

export const metadata: Metadata = {
  title: tccgPublicProductContext.seo.title,
  description: tccgPublicProductContext.seo.description,
};

export default function Home() {
  return <PublicMarketingSite />;
}
