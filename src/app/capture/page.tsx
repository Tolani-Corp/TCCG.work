import type { Metadata } from "next";

import { CaptureManagementWorkspace } from "@/components/CaptureManagementWorkspace";

export const metadata: Metadata = {
  title: "Capture Management",
  description:
    "TCCG capture management workspace for Grants.gov, SAM.gov, public-sector pursuits, go/no-go controls, and proposal workflow.",
};

export default function CapturePage() {
  return <CaptureManagementWorkspace />;
}
