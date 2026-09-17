import type { Metadata } from "next";

import { OwnerDashboardReadiness } from "@/components/OwnerDashboardReadiness";

export const metadata: Metadata = {
  title: "Owner Dashboard",
  description: "TCCG source-backed owner dashboard data-contract and reporting readiness workspace.",
};

export default function OwnerDashboardPage() {
  return <OwnerDashboardReadiness />;
}
