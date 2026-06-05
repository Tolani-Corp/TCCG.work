import type { Metadata } from "next";

import { ConstructionOpsPlatform } from "@/components/ConstructionOpsPlatform";

export const metadata: Metadata = {
  title: "Operations Platform",
  description:
    "Live TCCG Operations Platform for work board, pipeline, crews, risks, and field execution.",
};

export default function OperationsPage() {
  return <ConstructionOpsPlatform />;
}
