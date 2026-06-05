import { NextRequest, NextResponse } from "next/server";

import { searchCaptureSources, type CaptureSearchInput } from "@/lib/captureSources";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input: CaptureSearchInput = {
    query: searchParams.get("query") ?? undefined,
    keywords: searchParams.get("keywords")?.split(","),
    limit: toNumber(searchParams.get("limit")),
  };

  return json(await searchCaptureSources(input));
}

export async function POST(request: NextRequest) {
  const body = await readJson(request);
  const input: CaptureSearchInput = {
    query: typeof body.query === "string" ? body.query : undefined,
    keywords: Array.isArray(body.keywords)
      ? body.keywords.filter((keyword): keyword is string => typeof keyword === "string")
      : undefined,
    limit: toNumber(body.limit),
  };

  return json(await searchCaptureSources(input));
}

function json(data: Awaited<ReturnType<typeof searchCaptureSources>>) {
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

async function readJson(request: NextRequest): Promise<Record<string, unknown>> {
  try {
    const parsed = (await request.json()) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
