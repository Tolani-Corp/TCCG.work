import crypto from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import { TCCG_CONTACT } from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TEXT = 4_000;

type RateEntry = { count: number; expiresAt: number };
type GlobalRateStore = typeof globalThis & { __tccgIntakeRates?: Map<string, RateEntry> };

const rateStore = ((globalThis as GlobalRateStore).__tccgIntakeRates ??= new Map<string, RateEntry>());

function clean(value: unknown, max = 320) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max);
}

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateStore.get(key);
  if (!current || current.expiresAt <= now) {
    rateStore.set(key, { count: 1, expiresAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  rateStore.set(key, current);
  return current.count > MAX_REQUESTS;
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  const rateKey = crypto.createHash("sha256").update(ip).digest("hex");
  if (isRateLimited(rateKey)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please call or try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true, reference: `TCCG-${Date.now().toString(36).toUpperCase()}` });
  }

  const intake = {
    fullName: clean(body.fullName, 120),
    organization: clean(body.organization, 160),
    email: clean(body.email, 320).toLowerCase(),
    phone: clean(body.phone, 40),
    projectLocation: clean(body.projectLocation, 240),
    projectType: clean(body.projectType, 160),
    timeline: clean(body.timeline, 120),
    budgetRange: clean(body.budgetRange, 120),
    message: clean(body.message, MAX_TEXT),
    privacyAccepted: body.privacyAccepted === true,
    smsConsent: body.smsConsent === true,
  };

  if (
    !intake.fullName ||
    !validEmail(intake.email) ||
    !intake.phone ||
    !intake.projectLocation ||
    !intake.projectType ||
    !intake.timeline ||
    intake.message.length < 20 ||
    !intake.privacyAccepted
  ) {
    return NextResponse.json({ ok: false, error: "Complete all required fields with valid project information." }, { status: 400 });
  }

  const endpoint = process.env.TCCG_INTAKE_WEBHOOK_URL?.trim();
  const secret = process.env.TCCG_INTAKE_WEBHOOK_SECRET?.trim();
  if (!endpoint) {
    return NextResponse.json(
      {
        ok: false,
        error: `Online intake is not configured. Call ${TCCG_CONTACT.phone.display} or email ${TCCG_CONTACT.email}.`,
      },
      { status: 503 },
    );
  }

  let destination: URL;
  try {
    destination = new URL(endpoint);
    if (destination.protocol !== "https:") throw new Error("Webhook must use HTTPS");
  } catch {
    return NextResponse.json({ ok: false, error: "Project intake is temporarily unavailable." }, { status: 503 });
  }

  const reference = `TCCG-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const upstream = await fetch(destination, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "TCCG-Work-Intake/1.0",
        ...(secret ? { "x-tccg-intake-secret": secret } : {}),
      },
      body: JSON.stringify({
        reference,
        source: "tccg.work",
        channel: "website",
        submittedAt: new Date().toISOString(),
        ...intake,
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!upstream.ok) {
      console.error(`[TCCG Intake] Upstream rejected ${reference} with ${upstream.status}`);
      return NextResponse.json({ ok: false, error: "We could not deliver the request. Please call or email the project team." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, reference }, { status: 202 });
  } catch (error) {
    console.error(`[TCCG Intake] Delivery failed for ${reference}`, error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ ok: false, error: "We could not deliver the request. Please call or email the project team." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
