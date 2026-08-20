import type { Metadata } from "next";

import { CaptureManagementWorkspace } from "@/components/CaptureManagementWorkspace";

export const metadata: Metadata = {
  title: "Capture Management",
  description:
    "TCCG capture-management prototype for public-sector pursuits, go/no-go controls, and proposal workflow.",
};

export default function CapturePage() {
  return (
    <div>
      <div className="border-b border-amber-200 bg-amber-50 px-6 py-3 text-center text-xs font-semibold text-amber-950">
        Digital Launch prototype: opportunity values, deadlines, partners and pursuit status are demonstration fixtures unless linked to a verified solicitation or production capture record.
      </div>
      <CaptureManagementWorkspace />
    </div>
  );
}
