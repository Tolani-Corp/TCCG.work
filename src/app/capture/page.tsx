import type { Metadata } from "next";

import { CaptureManagementWorkspace } from "@/components/CaptureManagementWorkspace";
import { requireTccgPortalAccess } from "@/lib/portalAccess";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Protected Capture Management",
  description: "Authenticated TC Construction Group public-sector capture workspace.",
  robots: { index: false, follow: false, nocache: true },
};

export default async function CapturePage() {
  await requireTccgPortalAccess();
  return <CaptureManagementWorkspace />;
}
