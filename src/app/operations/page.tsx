import type { Metadata } from "next";

import { ConstructionOpsPlatform } from "@/components/ConstructionOpsPlatform";

export const metadata: Metadata = {
  title: "Protected Operations Platform",
  description: "Authenticated TC Construction Group operations workspace.",
  robots: { index: false, follow: false, nocache: true },
};

export default function OperationsPage() {
  return <ConstructionOpsPlatform />;
}
