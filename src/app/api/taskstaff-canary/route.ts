import { NextResponse } from "next/server";

import canary from "../../../../.taskstaff/canary.json";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      ...canary,
      generatedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
