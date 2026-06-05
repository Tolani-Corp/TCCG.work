"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { versionedAsset } from "@/lib/brandAssets";

type BuyerKey = "owners" | "builders" | "public";

type BuyerProfile = {
  id: BuyerKey;
  label: string;
  title: string;
  summary: string;
  fit: string;
  priority: string;
  primaryCta: string;
  metrics: Array<{ label: string; value: string }>;
  pipeline: Array<{
    title: string;
    stage: string;
    value: string;
    next: string;
    tone: string;
  }>;
};

const buyerProfiles: BuyerProfile[] = [
  {
    id: "owners",
    label: "Facility owners",
    title: "Modernization programs that sell through comfort, cost, and evidence.",
    summary:
      "Position TCCG around HVAC controls, retrofit planning, energy reporting, and closeout records that make ownership decisions easier to approve.",
    fit: "Best for occupied facilities, portfolio upgrades, IAQ calls, and owner-direct service work.",
    priority: "Move from site discovery to priced scope with a documented operating case.",
    primaryCta: "Request owner review",
    metrics: [
      { label: "Qualified scopes", value: "14" },
      { label: "Avg cycle", value: "19d" },
      { label: "Evidence packs", value: "8" },
    ],
    pipeline: [
      {
        title: "Library controls retrofit",
        stage: "Field ready",
        value: "$124K",
        next: "Cutover plan",
        tone: "bg-emerald-500",
      },
      {
        title: "Warehouse ESG closeout",
        stage: "Inspection",
        value: "$46K",
        next: "Evidence binder",
        tone: "bg-sky-500",
      },
      {
        title: "Clinic AHU replacement",
        stage: "Estimating",
        value: "$88K",
        next: "Permit package",
        tone: "bg-amber-500",
      },
    ],
  },
  {
    id: "builders",
    label: "GC partners",
    title: "A trade partner front door for BIM, MEP coordination, and clean handoff.",
    summary:
      "Sell TCCG as a disciplined construction partner that can enter fast, document decisions, and keep field work tied to owner-ready deliverables.",
    fit: "Best for tenant improvements, renovation support, coordination rescue, and schedule-sensitive trade packages.",
    priority: "Convert project noise into priced work, responsible owners, and visible blockers.",
    primaryCta: "Build partner package",
    metrics: [
      { label: "Active bids", value: "11" },
      { label: "Coordination lanes", value: "5" },
      { label: "RFI risks", value: "12" },
    ],
    pipeline: [
      {
        title: "Tenant improvement BIM",
        stage: "Scheduled",
        value: "$32K",
        next: "RFI set",
        tone: "bg-sky-500",
      },
      {
        title: "Airport controls upgrade",
        stage: "Shortlist",
        value: "$420K",
        next: "Prime review",
        tone: "bg-emerald-500",
      },
      {
        title: "School IAQ response",
        stage: "Service",
        value: "$14K",
        next: "After-hours access",
        tone: "bg-red-500",
      },
    ],
  },
  {
    id: "public",
    label: "Public sector",
    title: "Capture-ready pursuit operations for grants, RFPs, and compliance-heavy work.",
    summary:
      "Blend funding discovery, go-no-go discipline, source evidence, risk planning, and field readiness into one capture-to-delivery path.",
    fit: "Best for SAM.gov opportunities, grants, municipal facilities, school systems, and public procurement teaming.",
    priority: "Keep source truth, shortfalls, deadlines, partners, and proposal actions in one operating rhythm.",
    primaryCta: "Open capture desk",
    metrics: [
      { label: "Capture value", value: "$765K" },
      { label: "Review queue", value: "9" },
      { label: "Risk gates", value: "4" },
    ],
    pipeline: [
      {
        title: "Airport terminal controls",
        stage: "Qualify",
        value: "$420K",
        next: "SAM package",
        tone: "bg-emerald-500",
      },
      {
        title: "Energy retrofit grant",
        stage: "Go/No-Go",
        value: "$250K",
        next: "Partner MOU",
        tone: "bg-amber-500",
      },
      {
        title: "K-12 BIM and IAQ",
        stage: "Source",
        value: "$95K",
        next: "Deadline check",
        tone: "bg-sky-500",
      },
    ],
  },
];

const offerCards = [
  {
    title: "Commercial front door",
    detail:
      "A sharper route for owners, builders, and public-sector partners to understand TCCG capability and start a real review.",
  },
  {
    title: "Operations proof",
    detail:
      "The marketing page points into the live TCCG Operations Platform instead of stopping at brochure copy.",
  },
  {
    title: "Capture motion",
    detail:
      "Funding, RFP, and grant opportunities route into the capture workspace for source truth, shortfalls, and next actions.",
  },
  {
    title: "Delivery narrative",
    detail:
      "HVAC, BIM, ESG, service, and closeout work are packaged as a sales story with operational evidence behind it.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Source demand",
    detail: "Direct inquiries, partners, SAM.gov, Grants.gov, and market signals enter the same review rhythm.",
  },
  {
    step: "02",
    title: "Qualify fit",
    detail: "TCCG filters by scope, owner urgency, trade fit, compliance needs, site access, and response calendar.",
  },
  {
    step: "03",
    title: "Package proof",
    detail: "The platform turns value, risk, evidence, crew fit, ESG notes, and blockers into a buyer-ready packet.",
  },
  {
    step: "04",
    title: "Move to work",
    detail: "Approved pursuits become work-board items with owners, lanes, next actions, and delivery status.",
  },
];

export function MarketingLandingPage() {
  const [activeBuyer, setActiveBuyer] = useState<BuyerKey>("owners");
  const profile = useMemo(
    () => buyerProfiles.find((buyer) => buyer.id === activeBuyer) ?? buyerProfiles[0],
    [activeBuyer],
  );

  return (
    <div className="bg-[var(--bg-page)]">
      <HeroSection />

      <section id="offers" className="border-b border-[var(--border-subtle)] bg-white">
        <div className="mx-auto max-w-[90rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-primary)]">
                Sales motion
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold text-slate-950 sm:text-4xl">
                Sell the platform, then prove delivery inside the platform.
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-[var(--text-secondary)] lg:ml-auto">
              The landing page gives prospects a clean commercial story while the operations
              workspace gives TCCG the internal control needed to qualify, price, pursue, and
              deliver the work.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {offerCards.map((card) => (
              <article key={card.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{card.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="border-b border-[var(--border-subtle)] bg-[var(--bg-page)]">
        <div className="mx-auto max-w-[90rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[24rem_minmax(0,1fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-primary)]">
                Buyer route
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
                Dynamic sales positioning by audience.
              </h2>

              <div className="mt-7 grid gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
                {buyerProfiles.map((buyer) => (
                  <button
                    key={buyer.id}
                    type="button"
                    aria-pressed={buyer.id === activeBuyer}
                    onClick={() => setActiveBuyer(buyer.id)}
                    className={`rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
                      buyer.id === activeBuyer
                        ? "bg-[var(--bg-strong)] text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {buyer.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                  Best fit
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{profile.fit}</p>
                <p className="mt-4 text-sm font-semibold text-slate-950">{profile.priority}</p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                      TCCG Operations Platform
                    </p>
                    <h3 className="mt-2 max-w-3xl text-2xl font-semibold text-slate-950">
                      {profile.title}
                    </h3>
                    <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--text-secondary)]">
                      {profile.summary}
                    </p>
                  </div>
                  <Link
                    href={profile.id === "public" ? "/capture" : "/operations"}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    {profile.primaryCta}
                  </Link>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {profile.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-slate-950">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_18rem]">
                <div className="space-y-3">
                  {profile.pipeline.map((item) => (
                    <div
                      key={item.title}
                      className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[minmax(0,1fr)_7rem_7rem]"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${item.tone}`} />
                          <p className="truncate text-sm font-semibold text-slate-950">{item.title}</p>
                        </div>
                        <p className="mt-2 text-xs font-medium text-[var(--text-secondary)]">
                          Next: {item.next}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">{item.stage}</p>
                      <p className="text-sm font-semibold text-slate-950">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-slate-200 bg-[var(--bg-strong)] p-4 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                    Operating packet
                  </p>
                  <div className="mt-5 space-y-4">
                    <PacketLine label="Source" value="Lead + funding + referral" />
                    <PacketLine label="Proof" value="Scope, risk, evidence" />
                    <PacketLine label="Move" value="Operations lane + owner" />
                    <PacketLine label="Close" value="Proposal or field handoff" />
                  </div>
                  <div className="mt-6 flex flex-col gap-2">
                    <Link
                      href="/operations"
                      className="inline-flex min-h-10 items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
                    >
                      Open platform
                    </Link>
                    <Link
                      href="/capture"
                      className="inline-flex min-h-10 items-center justify-center rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      View capture desk
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="proof" className="border-b border-[var(--border-subtle)] bg-white">
        <div className="mx-auto max-w-[90rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-primary)]">
                Lead to delivery
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
                A sales page that creates operational next actions.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
                Prospects see a clear offer. TCCG sees the internal route from inquiry to pursuit,
                from pursuit to work board, and from work board to closeout evidence.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {processSteps.map((step) => (
                <article key={step.step} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-primary)]">
                    {step.step}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{step.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[var(--bg-strong)] text-white">
        <div className="mx-auto grid max-w-[90rem] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_28rem] lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
              Sales ready
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold sm:text-4xl">
              Start with a project review, capture review, or partner package.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
              TCCG can route commercial work, public-sector opportunities, BIM coordination,
              smart HVAC modernization, and ESG closeout into one operating system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:info@tccg.work?subject=TCCG%20project%20review"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Request project review
              </a>
              <Link
                href="/operations"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Enter operations
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Review packet</p>
            <div className="mt-5 space-y-3">
              {["Scope fit", "Funding route", "Crew capacity", "Risk controls", "Closeout proof"].map((item) => (
                <div key={item} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                  <span className="text-sm text-white/65">{item}</span>
                  <span className="text-sm font-semibold text-white">Ready</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--bg-strong)] text-white">
      <Image
        src={versionedAsset("/marketing/tccg-operations-hero.png")}
        alt="Mechanical facility and operations platform background"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-[rgba(5,12,18,0.3)]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-10rem)] max-w-[90rem] flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-4xl">
          <Image
            src={versionedAsset("/logo.svg")}
            alt="TC Construction Group"
            width={306}
            height={60}
            className="h-11 w-auto brightness-0 invert"
            priority
          />
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.28em] text-white/65">
            TC Construction Group
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
            TCCG Operations Platform
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
            A sales-forward front door for smart HVAC, BIM coordination, ESG closeout,
            public-sector capture, and field execution. The buyer story connects directly to the
            operating system that moves work.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:info@tccg.work?subject=TCCG%20project%20review"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              Request project review
            </a>
            <Link
              href="/operations"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Open operations platform
            </Link>
            <Link
              href="/capture"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View capture desk
            </Link>
          </div>
        </div>

        <dl className="mt-10 hidden max-w-5xl grid-cols-3 gap-6 border-y border-white/15 py-5 sm:grid">
          <HeroMetric value="HVAC + BIM" label="Commercial work lanes" />
          <HeroMetric value="Grant + RFP" label="Capture-ready sourcing" />
          <HeroMetric value="Ops board" label="Delivery proof system" />
        </dl>
      </div>
    </section>
  );
}

function HeroMetric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-sm text-white/55">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-white">{value}</dd>
    </div>
  );
}

function PacketLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/45">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
