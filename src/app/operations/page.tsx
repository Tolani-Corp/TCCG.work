import type { Metadata } from "next";

import { ConstructionOpsPlatform } from "@/components/ConstructionOpsPlatform";

export const metadata: Metadata = {
  title: "Operations Platform",
  description:
    "TCCG Operations Platform prototype for work board, pipeline, crews, risks, and field execution.",
};

export default function OperationsPage() {
  return (
    <div>
      <div className="border-b border-amber-200 bg-amber-50 px-6 py-3 text-center text-xs font-semibold text-amber-950">
        Digital Launch prototype: project names, values, crews and pipeline records shown here are demonstration fixtures unless independently verified in a production source system.
      </div>
      <ConstructionOpsPlatform />
    </div>
  );
}
