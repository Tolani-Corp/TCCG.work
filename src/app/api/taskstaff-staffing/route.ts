import { NextResponse } from "next/server";

import { getTaskStaffStaffingSnapshot } from "@/lib/taskstaffStaffing";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getTaskStaffStaffingSnapshot(), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
