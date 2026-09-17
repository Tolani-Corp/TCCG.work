import Link from "next/link";

import {
  PublicPageViewTracker,
  TrackedConversionLink,
} from "@/components/PublicConversionClient";
import { tccgPublicProductContext as context } from "@/lib/publicProductContext";

const reviewLanes = [
  {
    title: "General Construction",
    detail:
      "Review preconstruction, construction management, subcontractor coordination, project controls, quality, safety, commissioning and closeout requirements against the specific opportunity.",
  },
  {
    title: "HVAC + Building Performance",
    detail:
      "Review modernization, controls coordination, troubleshooting, procurement, commissioning and owner-training requirements before representing service fit.",
  },
  {
    title: "BIM / VDC",
    detail:
      "Review BIM execution, model federation, coordination, constructability, issue management and controlled information handoff requirements.",
  },
  {
    title: "Digital Project Delivery",
    detail:
      "Review CDE, RFI/submittal/change, procurement, QC/HSE and owner-reporting requirements against TCCG's implemented workflow standards.",
  },
];

const qualificationBoundaries = [
  "Contractor-license authority and geography",
  "Insurance limits and bonding capacity",
  "Government identifiers and certifications",
  "Past performance, partner status and project availability",
];

const buyerRoutes = [
  {
    title: "Owners + Facility Teams",
    detail:
      "Bring a real scope, location, schedule and owner requirement set for an opportunity-specific fit review.",
    href: context.primaryCTA.route,
    cta: context.primaryCTA.label,
    event: context.primaryCTA.event,
    downstreamState: context.primaryCTA.downstreamState,
  },
  {
    title: "General Contractors + Teaming Partners",
    detail:
      "Review TCCG's controlled qualification approach before relying on capability, license, bonding, insurance or availability claims.",
    href: context.secondaryCTA.route,
    cta: context.secondaryCTA.label,
    event: context.secondaryCTA.event,
    downstreamState: context.secondaryCTA.downstreamState,
  },
  {
    title: "Public-Sector Buyers",
    detail:
      "Use the capture desk to evaluate solicitation requirements while registrations, certifications, labor, cybersecurity and risk-transfer evidence remain opportunity-specific gates.",
    href: "/capture",
    cta: "Open capture desk",
    event: context.secondaryCTA.event,
    downstreamState: "public_sector_capture_review",
  },
] as const;

export function PublicMarketingSite() {
  return (
    <div>
      <PublicPageViewTracker publicStatus={context.publicStatus} />

      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-strong)] text-white">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">
              TC Construction Group · {context.publicStatus}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
              Start with the scope. Qualify the opportunity before the commitment.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              {context.valueProposition}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedConversionLink
                href={context.primaryCTA.route}
                event={context.primaryCTA.event}
                downstreamState={context.primaryCTA.downstreamState}
                className="rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {context.primaryCTA.label}
              </TrackedConversionLink>
              <TrackedConversionLink
                href={context.secondaryCTA.route}
                event={context.secondaryCTA.event}
                downstreamState={context.secondaryCTA.downstreamState}
                className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {context.secondaryCTA.label}
              </TrackedConversionLink>
              <Link
                href="/digital-launch"
                className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Inspect Digital Launch evidence
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">
              Opportunity review boundary
            </p>
            <h2 className="mt-3 text-2xl font-bold">Evidence before external qualification.</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              {context.legalAndCompliance.rule}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/75">
              {qualificationBoundaries.map((boundary) => (
                <li key={boundary} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" />
                  <span>{boundary}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] bg-white">
        <div className="mx-auto max-w-[90rem] px-6 py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
              Review lanes
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Evaluate the delivery requirement, then prove the fit.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">
              The lanes below describe what TCCG's operating system is structured to review. They do not override opportunity-specific licensing, capacity, insurance, bonding, certification or availability checks.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reviewLanes.map((service) => (
              <article key={service.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-bold text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/services" className="text-sm font-semibold text-[var(--accent-primary)]">
              Review service architecture →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-page)]">
        <div className="mx-auto max-w-[90rem] px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-5 lg:grid-cols-3">
            {buyerRoutes.map((route) => (
              <article key={route.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-950">{route.title}</h2>
                <p className="mt-3 min-h-20 text-sm leading-7 text-slate-600">{route.detail}</p>
                <TrackedConversionLink
                  href={route.href}
                  event={route.event}
                  downstreamState={route.downstreamState}
                  className="mt-5 inline-flex text-sm font-semibold text-[var(--accent-primary)]"
                >
                  {route.cta} →
                </TrackedConversionLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] bg-white">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
              Why the review is different
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Govern project information before asking an owner to trust the dashboard.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              TCCG's repository contains BIM/CDE, estimating, procurement, quality, HSE, project-control and owner-reporting standards. Live providers, project feeds and external qualifications remain separate activation gates.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {context.differentiators.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-bold leading-6 text-slate-950">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] bg-slate-950 text-white">
        <div className="mx-auto grid max-w-[90rem] gap-8 px-6 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
              Digital Launch evidence
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Inspect the standards and controls separately from external readiness.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/65">
              The Digital Launch command center documents implemented standards, workflows, templates, evidence requirements and explicit launch gates. It is not evidence that licenses, bonding, insurance, certifications, supplier relationships or live project integrations are complete.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/digital-launch"
              className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-400"
            >
              Open Digital Launch
            </Link>
            <Link
              href="/operations"
              className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Review operations model
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-[90rem] px-6 py-16 lg:px-8 lg:py-20">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                Project intake
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                Bring a real scope, pursuit or teaming need.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                TCCG will use the intake to evaluate scope fit, location, schedule, procurement method and documentary qualification gates before representing availability or qualifications.
              </p>
            </div>
            <div className="mt-6 flex shrink-0 flex-wrap gap-3 lg:mt-0">
              <TrackedConversionLink
                href={context.primaryCTA.route}
                event={context.primaryCTA.event}
                downstreamState={context.primaryCTA.downstreamState}
                className="rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-white"
              >
                {context.primaryCTA.label}
              </TrackedConversionLink>
              <a
                href="mailto:info@tccg.work"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900"
              >
                Email TCCG
              </a>
            </div>
          </div>
          <p className="mt-5 text-center text-xs text-slate-500">
            External qualifications are verified per opportunity before use. Public intake does not accept sensitive project information.
          </p>
        </div>
      </section>
    </div>
  );
}
