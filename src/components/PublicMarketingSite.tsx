import Link from "next/link";

import {
  agentPrototypes,
  capabilityStatement,
  launchReadiness,
  ownerDashboardMetrics,
  projectTemplates,
  trainingPipeline,
} from "@/lib/digitalLaunch";

const serviceLines = [
  {
    title: "General Construction",
    detail:
      "Preconstruction, construction management, subcontractor coordination, project controls, quality, safety, commissioning and closeout.",
  },
  {
    title: "HVAC + Building Performance",
    detail:
      "HVAC modernization, controls coordination, performance troubleshooting, procurement planning, commissioning support and owner training.",
  },
  {
    title: "BIM / VDC",
    detail:
      "BIM execution planning, model federation, coordination, constructability, issue management and controlled field/closeout information handoff.",
  },
  {
    title: "Digital Project Delivery",
    detail:
      "CDE governance, RFI/submittal/change workflows, procurement visibility, owner reporting and governed AI-assisted project administration.",
  },
];

const buyerRoutes = [
  {
    title: "Owners + Facility Teams",
    detail: "Scope modernization, manage project evidence and maintain visibility from preconstruction through turnover.",
    href: "/contact",
    cta: "Request project review",
  },
  {
    title: "General Contractors + Teaming Partners",
    detail: "Evaluate TCCG for BIM/VDC, HVAC, project controls and specialty delivery support against the actual opportunity requirements.",
    href: "/capabilities",
    cta: "Review capabilities",
  },
  {
    title: "Public-Sector Buyers",
    detail: "Use an evidence-controlled capture workflow for solicitation compliance, registrations, risk, bonding and delivery readiness.",
    href: "/capture",
    cta: "Open capture desk",
  },
];

export function PublicMarketingSite() {
  const readiness = launchReadiness();

  return (
    <div>
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-strong)] text-white">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">TC Construction Group</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
              Building Beyond with a digital construction operating system.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              TCCG connects preconstruction, BIM/VDC, HVAC, estimating, procurement, project controls,
              quality, safety and owner reporting through controlled information and evidence-based workflows.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                Request project review
              </Link>
              <Link href="/capabilities" className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View capabilities
              </Link>
              <Link href="/digital-launch" className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Explore Digital Launch
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Digital launch baseline</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-5xl font-black">{readiness}%</span>
              <span className="pb-1 text-sm text-white/50">structural readiness</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-orange-400" style={{ width: `${readiness}%` }} />
            </div>
            <p className="mt-4 text-sm leading-6 text-white/65">
              This score measures implemented standards, workflows and registries. External licenses,
              registrations, insurance, bonding, supplier pricing, vendor relationships and past performance
              remain evidence-gated until verified.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] bg-white">
        <div className="mx-auto max-w-[90rem] px-6 py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-primary)]">Service architecture</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Construction capability built around information continuity.</h2>
            <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">
              TCCG is designed to preserve scope, cost, schedule, quality, safety and owner evidence from opportunity intake through closeout.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {serviceLines.map((service) => (
              <article key={service.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-bold text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/services" className="text-sm font-semibold text-[var(--accent-primary)]">Explore service lines →</Link>
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
                <Link href={route.href} className="mt-5 inline-flex text-sm font-semibold text-[var(--accent-primary)]">{route.cta} →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] bg-white">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-primary)]">Digital delivery</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">Owner reporting is a view over governed project evidence.</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Dashboards are designed around source-backed schedule, cost, design, procurement, quality, HSE and building-performance metrics rather than unsupported status narratives.
            </p>
            <Link href="/operations" className="mt-6 inline-flex rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white">Open operations platform</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {ownerDashboardMetrics.map((group) => (
              <div key={group.category} className="rounded-xl border border-slate-200 p-4">
                <p className="font-bold text-slate-950">{group.category}</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {group.metrics.slice(0, 3).map((metric) => <li key={metric}>• {metric}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] bg-slate-950 text-white">
        <div className="mx-auto max-w-[90rem] px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">Tolani Labs workforce pipeline</p>
              <h2 className="mt-3 text-3xl font-semibold">Training tied to construction role demand.</h2>
              <div className="mt-7 space-y-3">
                {trainingPipeline.map((stage, index) => (
                  <div key={stage.stage} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                    <span className="text-xs font-black text-orange-300">0{index + 1}</span>
                    <div><p className="font-semibold">{stage.stage}</p><p className="mt-1 text-sm text-white/60">{stage.outcomes.join(" • ")}</p></div>
                  </div>
                ))}
              </div>
              <Link href="/careers" className="mt-6 inline-flex text-sm font-semibold text-orange-300">Explore training + careers →</Link>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">AI-assisted staff model</p>
              <h2 className="mt-3 text-3xl font-semibold">{agentPrototypes.length} governed construction-agent prototypes.</h2>
              <p className="mt-5 text-base leading-8 text-white/65">
                Agents assist with scope, estimates, drawings, RFIs, submittals, schedule, procurement, safety, quality, daily logs, changes, cost, closeout and lessons learned. Material project decisions remain human-approved.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {agentPrototypes.slice(0, 8).map((agent) => (
                  <div key={agent.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold">{agent.name}</p>
                    <p className="mt-1 text-xs leading-5 text-white/55">{agent.mission}</p>
                  </div>
                ))}
              </div>
              <Link href="/digital-launch" className="mt-6 inline-flex text-sm font-semibold text-orange-300">Inspect the full agent register →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] bg-white">
        <div className="mx-auto max-w-[90rem] px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-primary)]">Delivery templates</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">Repeatable project controls without forcing every project into one mold.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {projectTemplates.map((template) => (
                <div key={template.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-bold text-slate-950">{template.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{template.stages.join(" → ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[var(--bg-page)]">
        <div className="mx-auto max-w-[90rem] px-6 py-16 lg:px-8 lg:py-20">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-primary)]">Project intake</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">Bring TCCG a real scope, pursuit or teaming need.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                TCCG will review scope fit, licensing, capacity, schedule, procurement, bonding/insurance and delivery requirements before representing availability or qualifications.
              </p>
            </div>
            <div className="mt-6 flex shrink-0 flex-wrap gap-3 lg:mt-0">
              <Link href="/contact" className="rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-white">Start project review</Link>
              <a href="mailto:info@tccg.work" className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900">Email TCCG</a>
            </div>
          </div>
          <p className="mt-5 text-center text-xs text-slate-500">
            {capabilityStatement.legalName} • {capabilityStatement.tagline} • External qualifications are verified per opportunity before use.
          </p>
        </div>
      </section>
    </div>
  );
}
