import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "tccg-work",
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
      intakeConfigured: Boolean(process.env.TCCG_INTAKE_WEBHOOK_URL),
      clerkConfigured: Boolean(
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
      ),
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
