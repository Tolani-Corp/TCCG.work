import { NextRequest, NextResponse } from "next/server";

import { getDigitalLaunchSnapshot } from "@/lib/digitalLaunch";

export const dynamic = "force-dynamic";

const allowedSections = new Set([
  "workstreams",
  "bimStandard",
  "cdeStandard",
  "costCodes",
  "estimatingAssemblies",
  "subcontractors",
  "procurementWorkflow",
  "qcWorkflow",
  "hseWorkflow",
  "ownerDashboardMetrics",
  "projectTemplates",
  "preconstructionProcess",
  "capabilityStatement",
  "portfolioPolicy",
  "trainingPipeline",
  "agentPrototypes",
  "vendorTargets",
  "riskTransferReadiness",
  "governmentReadiness",
  "references",
]);

export async function GET(request: NextRequest) {
  const snapshot = getDigitalLaunchSnapshot();
  const section = request.nextUrl.searchParams.get("section");

  if (!section) {
    return NextResponse.json(snapshot, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  if (!allowedSections.has(section)) {
    return NextResponse.json(
      {
        error: "Unknown digital-launch section",
        allowedSections: Array.from(allowedSections),
      },
      { status: 400 },
    );
  }

  const value = snapshot[section as keyof typeof snapshot];

  return NextResponse.json(
    {
      generatedAt: snapshot.generatedAt,
      readiness: snapshot.readiness,
      section,
      data: value,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
