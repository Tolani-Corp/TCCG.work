import type { Metadata } from "next";

import { ConstructionOpsPlatform } from "@/components/ConstructionOpsPlatform";
import { requireTccgPortalAccess } from "@/lib/portalAccess";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Protected Operations Platform",
  description: "Authenticated TC Construction Group operations workspace.",
  robots: { index: false, follow: false, nocache: true },
};

export default async function OperationsPage() {
  await requireTccgPortalAccess();
  return <ConstructionOpsPlatform />;
}
